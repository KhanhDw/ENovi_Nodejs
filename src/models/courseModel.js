require("dotenv").config();
const UserModel = require("./userModel");
const categoryModel = require("./categoriesModel");
const { executeQuery } = require("../config/query");

class CourseModel {
    static async createCourse(title, price, instructorId) {
        return await executeQuery(
            `INSERT INTO Courses (title, price, instructorId, status)
             VALUES (?, ?, ?, 'active');`,
            [title, price, instructorId]
        );
    }

    // get course to update
    static async getCourseById(idCourse, instructorId) {
        console.log(idCourse, instructorId);
        return await executeQuery(
            `
            SELECT 
                c.id,
                c.title,
                c.price,
                c.level,
                c.instructorId,
                c.status,
                c.createdAt,
                c.updatedAt,
                c.img,
                c.duration,
                c.rating,
                c.languages AS language_code,  -- Hiển thị mã ngôn ngữ
                l.language_name,  -- Lấy tên ngôn ngữ từ bảng Languages
                c.subtitles AS subtitle_code,
                c.code_discount,
                c.percent_discount,
                cc.categoryId,
                cc.categoryType,
                COALESCE(cat.name, catV1.name, catV2.name) AS category_name,
                cd.overview,
                cd.description,
                cd.requirements,
                cd.whatToLearn,
                s.id AS section_id,
                s.title AS section_name,
                s.sectionOrder
            FROM Courses c
            LEFT JOIN CourseCategories cc ON c.id = cc.courseId
            LEFT JOIN Sections s ON s.courseId = cc.courseId
            LEFT JOIN Categories cat ON cc.categoryId = cat.id AND cc.categoryType = 'lĩnh vực'
            LEFT JOIN CategoriesV1 catV1 ON cc.categoryId = catV1.id AND cc.categoryType = 'chuyên ngành'
            LEFT JOIN CategoriesV2 catV2 ON cc.categoryId = catV2.id AND cc.categoryType = 'phân mục'
            LEFT JOIN CourseDetails cd ON c.id = cd.courseId  -- Thêm thông tin từ CourseDetails
            LEFT JOIN Languages l ON c.languages = l.language_code  -- Liên kết để lấy tên ngôn ngữ
            WHERE c.id = ? AND c.instructorId = ?;

            `,
            [idCourse, instructorId]
        );
    }
    static async getCourseByTitle(title) {
        return await executeQuery("SELECT * FROM Courses WHERE Title = ?", [
            title,
        ]);
    }
    static async getCourseByPrice(price) {
        return await executeQuery("SELECT * FROM Courses WHERE price = ?", [
            price,
        ]);
    }
    static async getCourseByInstructorID(instructorId) {
        return await executeQuery(
            `
                SELECT
                    c.id,
                    c.title,
                    c.price,
                    c.img,
                    c.rating,
                    c.createdAt,
                    COUNT(e.courseId) AS enrollments,
                    SUM(
                        CASE
                            WHEN MONTH(e.enrolledAt) = MONTH(CURRENT_DATE())
                            AND YEAR(e.enrolledAt) = YEAR(CURRENT_DATE())
                            THEN 1
                            ELSE 0
                        END
                    ) AS enrollmentsPerMonth
                FROM
                    Courses c
                LEFT JOIN
                    Enrollments e ON c.id = e.courseId
                WHERE
                    c.instructorId = ?
                GROUP BY
                    c.id, c.title, c.price, c.img, c.rating, c.createdAt
                ORDER BY
                    c.createdAt DESC;
            `,
            [instructorId]
        );
    }
    static async getSearchCourseInstructorByTitle(instructorId, title, sortBy) {
        // Escape ký tự `%` và `_` để tránh lỗi SQL Injection
        const safeTitle = title.replace(/[%_]/g, "\\$&");

        // Xác định ORDER BY dựa vào sortBy
        let orderByClause = "c.createdAt DESC"; // Default: mới nhất
        switch (sortBy) {
            case "oldest":
                orderByClause = "c.createdAt ASC";
                break;
            case "rating_top":
                orderByClause = "c.rating DESC";
                break;
            case "rating_bottom":
                orderByClause = "c.rating ASC";
                break;
            case "update_near":
                orderByClause = "c.updatedAt DESC";
                break;
            case "update_far":
                orderByClause = "c.updatedAt ASC";
                break;
        }

        const query = `
            SELECT
                c.id,
                c.title,
                c.price,
                c.img,
                c.rating,
                c.createdAt,
                c.updatedAt,
                COUNT(e.courseId) AS enrollments,
                SUM(
                    CASE
                        WHEN MONTH(e.enrolledAt) = MONTH(CURRENT_DATE())
                        AND YEAR(e.enrolledAt) = YEAR(CURRENT_DATE())
                        THEN 1
                        ELSE 0
                    END
                ) AS enrollmentsPerMonth
            FROM Courses c
            LEFT JOIN Enrollments e ON c.id = e.courseId
            WHERE c.instructorId = ? AND c.title LIKE ?
            GROUP BY c.id, c.title, c.price, c.img, c.rating, c.createdAt, c.updatedAt
            ORDER BY ${orderByClause};
        `;
        // Nếu safeTitle rỗng, dùng '%' để bỏ qua lọc theo title
        const titleParam = safeTitle ? `%${safeTitle}%` : "%";
        return await executeQuery(query, [instructorId, titleParam]);
    }
    static async getCourseByLevel(level) {
        return await executeQuery("SELECT * FROM Courses WHERE level = ?", [
            level,
        ]);
    }
    static async deleteCourseByCourseId(id) {
        return await executeQuery(
            `
            delete FROM Courses 
            where 
                id=?;
            `,
            [id]
        );
    }

    static async getCourseByCategory(categoryName) {
        const categoryId = await categoryModel.getCaterogiesIdByName(
            categoryName
        );
        return await executeQuery(
            "SELECT * FROM Courses WHERE categoryId = ?",
            [categoryId]
        );
    }
    static async getCourseByCategoryV1(categoryName) {
        const categoryId = await categoryModel.getCaterogiesV1IdByName(
            categoryName
        );
        return await executeQuery(
            "SELECT * FROM Courses WHERE categoryId = ?",
            [categoryId]
        );
    }
    static async getCourseByCategoryV2(categoryName) {
        const categoryId = await categoryModel.getCaterogiesV2IdByName(
            categoryName
        );
        return await executeQuery(
            "SELECT * FROM Courses WHERE categoryId = ?",
            [categoryId]
        );
    }

    // trung bình - tìm kiếm khóa học trong search page
    static async searchCoursesMD(queryParams) {
        let limit = 20;
        let page = queryParams.page ? parseInt(queryParams.page) : 1;
        let offset = (page - 1) * limit;

        try {
            let query = `
                    SELECT 
                        c.id AS id,
                        c.title AS title,
                        cd.description AS description,
                        u.username AS author,
                        c.duration AS duration,              
                        c.rating,                
                        c.price AS price,
                        c.img AS img,
                        c.languages AS languages
                    FROM 
                        Courses c
                    INNER JOIN 
                        Users u ON c.instructorId = u.id
                    LEFT JOIN 
                        CourseDetails cd ON c.id = cd.courseId
                    WHERE 
                        c.status = 'active' 
                `;

            let queryCount = `
                    SELECT 
                        COUNT(c.title) AS total 
                    FROM Courses c
                    INNER JOIN 
                        Users u ON c.instructorId = u.id
                    LEFT JOIN 
                        CourseDetails cd ON c.id = cd.courseId
                    WHERE 
                        c.status = 'active' 
                `;

            const params = [];

            if (queryParams.title) {
                query += " AND c.title LIKE ? ";
                queryCount += " AND c.title LIKE ? ";
                params.push(`%${queryParams.title}%`);
            }
            if (queryParams.rating) {
                query += " AND c.rating >= ?";
                queryCount += " AND c.rating >= ?";
                params.push(queryParams.rating);
            }
            if (queryParams.language) {
                switch (parseInt(queryParams.language)) {
                    case 1:
                        query += " AND c.languages = 'Việt Nam'";
                        queryCount += " AND c.languages = 'Việt Nam'";
                        break;
                    case 2:
                        query += " AND c.languages ='Anh' ";
                        queryCount += " AND c.languages ='Anh' ";
                        break;
                    case 3:
                        query += " AND c.languages = 'Trung Quốc'";
                        queryCount += " AND c.languages = 'Trung Quốc'";
                        break;
                    case 4:
                        query += " AND c.languages ='Hàn Quốc' ";
                        queryCount += " AND c.languages ='Hàn Quốc' ";
                        break;
                    case 5:
                        query += " AND c.languages = 'Nhật Bản'";
                        queryCount += " AND c.languages = 'Nhật Bản'";
                        break;
                    default:
                        break;
                }
            }
            if (queryParams.duration !== undefined) {
                // Kiểm tra undefined để tránh lỗi
                switch (parseInt(queryParams.duration)) {
                    case 1:
                        query += " AND c.duration BETWEEN ? AND ?";
                        queryCount += " AND c.duration BETWEEN ? AND ?";
                        params.push(0, 60); // 0-60 phút
                        break;
                    case 2:
                        query += " AND c.duration BETWEEN ? AND ?";
                        queryCount += " AND c.duration BETWEEN ? AND ?";
                        params.push(60, 180); // 60-180 phút
                        break;
                    case 3:
                        query += " AND c.duration BETWEEN ? AND ?";
                        queryCount += " AND c.duration BETWEEN ? AND ?";
                        params.push(180, 360); // 180-360 phút
                        break;
                    case 4:
                        query += " AND c.duration BETWEEN ? AND ?";
                        queryCount += " AND c.duration BETWEEN ? AND ?";
                        params.push(360, 1020); // 360-1020 phút
                        break;
                    case 5:
                        query += " AND c.duration > ?";
                        queryCount += " AND c.duration > ?";
                        params.push(1020); // 1020+ phút
                        break;
                    default:
                        break;
                }
            }

            if (queryParams.level) {
                query += " AND c.level = ?";
                queryCount += " AND c.level = ?";
                params.push(queryParams.level);
            }
            if (queryParams.price) {
                switch (parseInt(queryParams.price)) {
                    case 1:
                        query += " AND c.price = 0.0";
                        queryCount += " AND c.price = 0.0";
                        break;
                    case 2:
                        query += " AND c.price > 0.0";
                        queryCount += " AND c.price > 0.0";
                        break;
                    default:
                        break;
                }
            }

            if (queryParams.sort) {
                switch (queryParams.sort) {
                    case "Mới nhất":
                        query += " ORDER BY c.createdAt DESC";
                        break;
                    case "Giá tăng dần":
                        query += " ORDER BY c.price ASC";
                        break;
                    case "Giá giảm dần":
                        query += " ORDER BY c.price DESC";
                        break;
                    default:
                        break;
                }
            }

            query += ` LIMIT  ${Number(limit)} OFFSET ${Number(offset)}`;

            // console.log(query);

            const resultTotalCoures = await executeQuery(queryCount, params);
            const resultCoures = await executeQuery(query, params);

            // console.warn("params: " + params);
            // console.warn("resultCoures: " + resultCoures);
            // if (resultCoures.length > 0){
            // resultCoures.forEach((item, index) => {
            //     console.log(`Object ${index + 1}:`, item);
            // });}

            // const totalCourses = resultTotalCoures?.[0]?.total ?? 0; // Tránh lỗi nếu `undefined`
            // console.warn("total11: " + totalCourses);
            return {
                totalItem: resultTotalCoures[0].total,
                course: resultCoures,
            };
        } catch (error) {
            console.error("Lỗi khi tìm kiếm khóa học:", error);
            throw new Error("Không thể tìm kiếm khóa học vào lúc này.");
        }
    }

    // trung bình - cập nhật khóa học cho instructor course
    static async updateCourseInstructorByInstructorId(
        idCourse,
        instructorId,
        updates
    ) {
        if (
            !idCourse ||
            !instructorId ||
            !updates ||
            Object.keys(updates).length === 0
        ) {
            throw new Error("Thiếu thông tin cần thiết để cập nhật");
        }

        let fields = [];
        let values = [];

        Object.entries(updates).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                // Chỉ cập nhật nếu có giá trị
                fields.push(`${key} = ?`);
                values.push(value);
            }
        });

        if (fields.length === 0) return; // Không có gì để cập nhật

        values.push(idCourse, instructorId);
        const sql = `
                    UPDATE Courses c
                    JOIN CourseDetails cd ON c.id = cd.courseId
                    SET ${fields.join(", ")}, updatedAt = CURRENT_TIMESTAMP 
                    WHERE c.id = ? AND instructorId = ?;
                    `;
        return await executeQuery(sql, values);
    }

    static async ClearCategoryCourseId(CourseId) {
        const sqlremove = `DELETE FROM CourseCategories WHERE courseId = ?;`;
        try {
            await executeQuery(sqlremove, [parseInt(CourseId)]);
        } catch (error) {
            console.error("Error updating category:", error);
        }
    }

    static async updateCategory(categoryId, categoryType, CourseId, parentId) {
        console.log("Updating category:", categoryId, categoryType, CourseId);

        const sql = `
          INSERT INTO CourseCategories (courseId, categoryId, categoryType, parentId)
          VALUES (?, ?, ?, ?);  
        `;
        try {
            await executeQuery(sql, [
                parseInt(CourseId),
                categoryId,
                categoryType,
                parentId,
            ]);
            console.log(
                `Updated categoryId: ${categoryId} for courseId: ${CourseId}`
            );
        } catch (error) {
            console.error("Error updating category:", error);
        }
    }

    static async getAllCourse() {
        return await executeQuery("SELECT * FROM Courses");
    }
    
    static async getCourseByTitleLike(title) {
        const safeTitle = title.replace(/[%_]/g, "\\$&"); // Escape special characters for SQL LIKE
        return await executeQuery("SELECT * FROM Courses WHERE title LIKE ?", [
            `%${safeTitle}%`,
        ]);
    }

    static async getTopRatedFreeCourses(limit = 10) {
        const query = `
            SELECT 
                c.id,
                c.title,
                c.price,
                c.rating,
                c.img
            FROM Courses c
            WHERE c.price = 0.0 
            ORDER BY c.rating DESC
            LIMIT 10;
        `;
        // return await executeQuery(query);
        return await executeQuery(query, [limit]);
// 
    }
    
    static async getTopRatedCourses(limit = 10) {
        const query = `
            SELECT 
            c.id,
            c.title,
            c.price,
            c.rating,
            c.img
            FROM Courses c
            WHERE c.price != 0.0
            ORDER BY c.rating DESC
            LIMIT 10;
        `;
        return await executeQuery(query, [limit]);
    }

    static async searchCoursesByNameInMyLearning(userId, courseName) {
        const safeCourseName = courseName.replace(/[%_]/g, "\\$&"); // Escape special characters for SQL LIKE
        const query = `
            SELECT 
                c.id,
                c.title,
                c.img
            FROM Courses c
            INNER JOIN Enrollments e ON c.id = e.courseId
            WHERE e.userId = ? AND c.title LIKE ?;
        `;
        return await executeQuery(query, [userId, `%${safeCourseName}%`]);
    }

    static async getCountCoursesByInstructor(instructorId) {
        try {
            const query = `
                SELECT COUNT(*) as total_courses
                FROM Courses
                WHERE instructorId = ?;
            `;
            const [result] = await executeQuery(query, [instructorId]);
            return result.total_courses;
        } catch (error) {
            console.error("Lỗi khi lấy số lượng khóa học của giảng viên:", error);
            throw error;
        }
    }

    // coursePay
    static async getCoursePaymentById(courseId = []) {
        if (!Array.isArray(courseId) || courseId.length === 0) {
            throw new Error("courseId must be a non-empty array");
        }
        const placeholders = courseId.map(() => "?").join(", ");
        const query = `
            SELECT 
                id,
                img,
                title,
                rating,
                price,
                percent_discount
            FROM Courses
            WHERE id IN (${placeholders});
        `;
        return await executeQuery(query, courseId);
    }
}


module.exports = CourseModel;
