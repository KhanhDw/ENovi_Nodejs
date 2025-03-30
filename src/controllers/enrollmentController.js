const EnrollmentModel = require("../models/enrollment");

const addEnrollment = async (req, res) => {
    try {
        // Kiểm tra dữ liệu đầu vào
        const { userId, courseId } = req.body;
        if (!userId || !courseId) {
            return res.status(400).json({
                success: false,
                message: "Thiếu thông tin userId hoặc courseId",
            });
        }

        // Kiểm tra xem người dùng đã đăng ký khóa học này chưa
        const isEnrolled = await EnrollmentModel.checkEnrollment(
            userId,
            courseId
        );
        if (isEnrolled) {
            return res.status(400).json({
                success: false,
                message: "Người dùng đã đăng ký khóa học này",
            });
        }

        // Thêm đăng ký khóa học mới
        const result = await EnrollmentModel.addEnrollment(userId, courseId);

        if (result.success) {
            return res.status(201).json(result);
        } else {
            return res.status(400).json(result);
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Lỗi khi đăng ký khóa học",
            error: error.message,
        });
    }
};

module.exports = {
    addEnrollment,
};
