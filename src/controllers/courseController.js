const CourseModel = require("../models/courseModel");
const UserModel = require("../models/userModel");

const createCourse = async (req, res) => {
    try {
        const { title, price, instructorId } = req.body;

        console.log(title, price, instructorId);

        if (!title || !price || !instructorId) {
            return res.status(400).json({
                success: false,
                message: "Thiếu title, price hoặc instructorId",
            });
        }

        await CourseModel.createCourse(title, price, instructorId);
        res.json({ success: true, message: "create successfull" });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "create course fail ",
            error,
        });
    }
};

const getCourseById = async (req, res) => {
    try {
        const { idCourse, instructorId } = req.params;
        console.log({ idCourse, instructorId });
        const course = await CourseModel.getCourseById(idCourse, instructorId);
        res.status(200).json({ success: true, course: course });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Lỗi khi lấy khóa học theo id và instructor",
            error,
        });
    }
};
const getCourseByTitle = async (req, res) => {
    try {
        const { title } = req.params;
        const course = await CourseModel.getCourseByTitle(title);
        res.json({ success: true, course: course });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Lỗi khi lấy khóa học theo tiêu đề",
            error,
        });
    }
};

const getCourseByPrice = async (req, res) => {
    try {
        const { price } = req.params;
        const course = await CourseModel.getCourseByPrice(price);
        res.json(course);
    } catch (error) {
        res.status(500).json({
            message: "Lỗi khi lấy khóa học theo giá",
            error,
        });
    }
};

const getCourseByLevel = async (req, res) => {
    try {
        const { level } = req.params;
        const course = await CourseModel.getCourseByLevel(level);
        res.json(course);
    } catch (error) {
        res.status(500).json({
            message: "Lỗi khi lấy khóa học theo cấp độ",
            error,
        });
    }
};

const getListCourseByInstructorID = async (req, res) => {
    try {
        const { id } = req.params;
        const course = await CourseModel.getCourseByInstructorID(id);
        res.status(200).json({ success: true, course: course });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Lỗi khi lấy khóa học theo giảng viên",
            error: error,
        });
    }
};
const getSearchCourseInstructorByTitle = async (req, res) => {
    try {
        const { id, title, sortBy } = req.query;

        // ✅ Kiểm tra điều kiện đầu vào rõ ràng hơn
        if (!id || !sortBy) {
            return res.status(400).json({
                success: false,
                message: "Thiếu ID giảng viên hoặc sortBy",
            });
        }

        // ✅ Chỉ decode `title` nếu nó tồn tại
        const decodedTitle = title ? decodeURIComponent(title).trim() : "";

        console.log({ id, decodedTitle, sortBy });

        // ✅ Gọi model và truyền giá trị an toàn
        const course = await CourseModel.getSearchCourseInstructorByTitle(
            id,
            decodedTitle,
            sortBy
        );
        res.status(200).json({ success: true, course: course });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Lỗi khi lấy khóa học theo giảng viên",
            error: error.message,
        });
    }
};

const getCourseByCategory = async (req, res) => {
    try {
        const { categoryName } = req.params;
        const course = await CourseModel.getCourseByCategory(categoryName);
        res.json(course);
    } catch (error) {
        res.status(500).json({
            message: "Lỗi khi lấy khóa học theo danh mục",
            error,
        });
    }
};

const getCourseByCategoryV1 = async (req, res) => {
    try {
        const { categoryName } = req.params;
        const course = await CourseModel.getCourseByCategoryV1(categoryName);
        res.json(course);
    } catch (error) {
        res.status(500).json({
            message: "Lỗi khi lấy khóa học theo danh mục V1",
            error,
        });
    }
};

const getCourseByCategoryV2 = async (req, res) => {
    try {
        const { categoryName } = req.params;
        const course = await CourseModel.getCourseByCategoryV2(categoryName);
        res.json(course);
    } catch (error) {
        res.status(500).json({
            message: "Lỗi khi lấy khóa học theo danh mục V2",
            error,
        });
    }
};
const deleteCourseByInstructorID = async (req, res) => {
    try {
        const { idCourse } = req.params;
        await CourseModel.deleteCourseByCourseId(idCourse);
        res.status(200).json({
            success: true,
            message: "Thành công xóa khóa học",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Lỗi xóa khóa học",
            error: error,
        });
    }
};

const putUpdateCourseInstructor = async (req, res) => {
    const { idCourse, instructorId } = req.params;
    const updates = req.body; // Chỉ lấy những trường cần cập nhật

    if (!idCourse || !instructorId) {
        return res
            .status(400)
            .json({ message: "Thiếu idCourse hoặc instructorId" });
    }

    console.log(Object.keys(updates));
    console.log(Object.values(updates));

    // Kiểm tra và chuyển đổi price thành số nếu tồn tại
    if (updates.price !== undefined) {
        // Chuyển đổi price thành số, loại bỏ các ký tự không phải số nếu có
        const numericPrice = parseInt(updates.price);

        // Kiểm tra xem price có phải là số hợp lệ không
        if (isNaN(numericPrice)) {
            return res.status(400).json({
                message: "Giá trị price phải là một số hợp lệ",
            });
        }

        updates.price = numericPrice;
    }

    try {
        await CourseModel.updateCourseInstructorByInstructorId(
            idCourse,
            instructorId,
            updates
        );
        res.json({ success: true, message: "Cập nhật thành công course" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Lỗi server", error });
    }
};

const putUpdateCategoryCourse = async (req, res) => {
    try {
        const { courseId } = req.params;
        const { categorySelected } = req.body;

        if (
            !courseId ||
            !Array.isArray(categorySelected) ||
            categorySelected.length === 0
        ) {
            return res.status(400).json({
                error: "Dữ liệu đầu vào categorySelected không hợp lệ",
            });
        }

        try {
            /* xóa dữ liệu của course trước khi cập nhật */
            await CourseModel.ClearCategoryCourseId(courseId);
        } catch (error) {
            console.log(
                "lỗi không thể xóa dữ liệu category của khóa học id: " +
                    courseId +
                    "--" +
                    error
            );
        }

        for (const item of categorySelected) {
            const keys = Object.keys(item);

            const key0 = keys[0];
            const key2 = keys[2];
            const key3 = keys[3] ?? null;

            const categoryId = item[key0]; // Giá trị key 0
            const categoryType = item[key2]; // Giá trị key 2
            const parentId = item[key3] ?? null; // Giá trị key 3

            console.log("===================");
            console.log(key0, key2, key3);
            console.log(categoryId, categoryType, parentId);
            console.log("===================");

            if (categoryId && categoryType) {
                await CourseModel.updateCategory(
                    categoryId,
                    categoryType,
                    courseId,
                    parentId
                );
            } else {
                return res.status(400).json({
                    error: "Thiếu categoryId hoặc categoryType trong categorySelected",
                });
            }
        }

        res.status(200).json({
            success: true,
            message: "Cập nhật danh mục thành công!",
        });
    } catch (error) {
        console.error("Lỗi khi cập nhật danh mục:", error);
        res.status(500).json({
            success: false,
            error: "Lỗi server khi cập nhật danh mục",
        });
    }
};

const getAllCourse = async (req, res) => {
    try {
        const course = await CourseModel.getAllCourse();
        res.status(200).json({ succese: true, courses: course });
    } catch (error) {
        res.status(500).json({
            message: "Lỗi khi lấy khóa học",
            error,
        });
    }
};

const getInstructorName = async (req, res) => {
    try {
        const { instructorId } = req.query;
        const user = await UserModel.getUserById(instructorId);
        res.status(200).json({ success: true, user: user });
    } catch (error) {
        res.status(500).json({
            message: "Lỗi khi lấy khóa học",
            error,
        });
    }
};

const getCourseByTitleLike = async (req, res) => {
    try {
        const { title } = req.query;
        const course = await CourseModel.getCourseByTitleLike(title);
        res.status(200).json({ success: true, course: course });
    } catch (error) {
        res.status(500).json({
            message: "Lỗi khi lấy khóa học",
            error,
        });
    }
};

const getTopRatedFreeCourses = async (req, res) => {
    try {
        const { limit } = req.query;
        console.log("getTopRatedFreeCourses: " + limit);

        const parsedLimit = parseInt(limit, 10);

        const courses = await CourseModel.getTopRatedFreeCourses(parsedLimit);

        res.status(200).json({ success: true, courses: courses });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Lỗi khi lấy khóa học 1 miễn phí được đánh giá cao",
            error,
        });
    }
};

const getTopRatedCourses = async (req, res) => {
    try {
        const { limit } = req.query;
        console.log("getTopRatedCourses: " + typeof limit);

        const parsedLimit = parseInt(limit, 10) || 10; // Ensure limit is an integer

        console.log("parsedLimit: " + typeof parsedLimit);

        const courses = await CourseModel.getTopRatedCourses(parsedLimit);

        res.status(200).json({ success: true, courses: courses });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Lỗi khi lấy khóa học được đánh giá cao",
            error,
        });
    }
};

const getCountCoursesByInstructor = async (req, res) => {
    try {
        const { instructorId } = req.params;

        if (!instructorId) {
            return res.status(400).json({
                success: false,
                message: "Thiếu ID giảng viên",
            });
        }

        const totalCourses = await CourseModel.getCountCoursesByInstructor(
            instructorId
        );

        res.status(200).json({
            success: true,
            totalCourses: totalCourses,
        });
    } catch (error) {
        console.error("Lỗi khi lấy số lượng khóa học của giảng viên:", error);
        res.status(500).json({
            success: false,
            message: "Lỗi server khi lấy số lượng khóa học",
            error: error.message,
        });
    }
};


const getCoursePaymentById = async (req, res) => {
    try {
        const { courseIds } = req.query;

        const courseIdsArray = courseIds.split(',').map(id => id.trim());

        if (!Array.isArray(courseIdsArray) || courseIdsArray.length === 0) {
            return res.status(400).json({
                success: false,
                message: "courseIdsArray must be a non-empty array",
            });
        }

        const course = await CourseModel.getCoursePaymentById(courseIdsArray);

        if (!course || course.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Không tìm thấy khóa học",
            });
        }

        res.status(200).json({
            success: true,
            course: course,
        });
    } catch (error) {
        console.error("Lỗi khi lấy thông tin thanh toán khóa học:", error);
        res.status(500).json({
            success: false,
            message: "Lỗi server khi lấy thông tin thanh toán khóa học",
            error: error.message,
        });
    }
};

const updateIntroVideo = async (req, res) => {
    try {
        const { courseId } = req.params;
        const { introVideoUrl } = req.body;

        if (!courseId || !introVideoUrl) {
            return res.status(400).json({
                success: false,
                message: "Thiếu thông tin cần thiết để cập nhật intro_video",
            });
        }

        await CourseModel.updateIntroVideo(courseId, introVideoUrl);

        res.status(200).json({
            success: true,
            message: "Cập nhật intro_video thành công",
        });
    } catch (error) {
        console.error("Lỗi khi cập nhật intro_video:", error);
        res.status(500).json({
            success: false,
            message: "Lỗi server khi cập nhật intro_video",
            error: error.message,
        });
    }
};

const deleteCourseById = async (req, res) => {
    try {
        const { courseId } = req.params;

        if (!courseId) {
            return res.status(400).json({
                success: false,
                message: "Thiếu thông tin ID khóa học để xóa",
            });
        }
        if (courseId === -1) {
            return res.status(400).json({
                success: false,
                message: "id -1 xóa thất bại",
            });
        }

        await CourseModel.deleteCourseById(courseId);

        res.status(200).json({
            success: true,
            message: "Xóa khóa học thành công",
        });
    } catch (error) {
        console.error("Lỗi khi xóa khóa học:", error);
        res.status(500).json({
            success: false,
            message: "Lỗi server khi xóa khóa học",
            error: error.message,
        });
    }
};

module.exports = {
    getCourseById,
    getCourseByTitle,
    getCourseByPrice,
    getCourseByLevel,
    getCourseByCategory,
    getCourseByCategoryV1,
    getCourseByCategoryV2,
    getListCourseByInstructorID,
    deleteCourseByInstructorID,
    getSearchCourseInstructorByTitle,
    putUpdateCourseInstructor,
    putUpdateCategoryCourse,
    createCourse,
    getAllCourse,
    getInstructorName,
    getCourseByTitleLike,
    getTopRatedFreeCourses,
    getTopRatedCourses,
    getCountCoursesByInstructor,
    getCoursePaymentById,
    updateIntroVideo,
    deleteCourseById
};
