require("dotenv").config();
const UserModel = require("./userModel");
const categoryModel = require("./categoriesModel");
const { executeQuery } = require("../config/query");

class CourseModel {
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
    static async getCourseByInstructor(instructorName) {
        const instructorId = await UserModel.getUserByNameAndCheckInstructor(
            instructorName
        );
        return await executeQuery(
            "SELECT * FROM Courses WHERE instructorId = ?",
            [instructorId]
        );
    }

    static async getCourseByLevel(level) {
        return await executeQuery("SELECT * FROM Courses WHERE level = ?", [
            level,
        ]);
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

    // trung bình

        static async searchCoursesMD(queryParams) {
            let limit = 20;
            let page = queryParams.page ? parseInt(queryParams.page) : 1;
            let offset = (page - 1) * limit;
            

            try {
                let query = `
                    SELECT 
                        c.title AS title,
                        cd.description AS description,
                        u.username AS author,
                        c.duration AS duration,              
                        c.rating AS rate,                
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

                query += ` LIMIT  ${Number(limit)} OFFSET ${Number(offset)}`;

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
}

module.exports = CourseModel;
