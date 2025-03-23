const mylearningModel = require("../models/mylearningModel");
const courseModel = require("../models/courseModel");

const mylearning = new mylearningModel();

module.exports = {
    async addToMyLearning(req, res) {
        const { userId, courseId } = req.body;
        
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "Người dùng chưa đăng nhập"
            }); 
        }

        try {
            await mylearning.addToMyLearning(userId, courseId);
            res.status(200).json({
                success: true,
                message: "Đã thêm khóa học vào My Learning thành công"
            });
        } catch (error) {
            console.error("Lỗi khi thêm khóa học vào My Learning:", error);
            res.status(500).json({
                success: false, 
                message: "Không thể thêm khóa học vào My Learning",
                error: error.message
            });
        }
    },

    async getMyLearningByUserId(req, res) {
        const { userId } = req.params;
        try {
            const data = await mylearning.getMyLearningByUserId(userId);
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ error: "Failed to fetch MyLearning data." });
        }
    },

    async removeFromMyLearning(req, res) {
        const { userId, courseId } = req.body;
        try {
            await mylearning.removeFromMyLearning(userId, courseId);
            res.status(200).json({ message: "Course removed from MyLearning successfully." });
        } catch (error) {
            res.status(500).json({ error: "Failed to remove course from MyLearning." });
        }
    },

    async searchCoursesByName(req, res) {
        const { userId, courseName } = req.query;
        try {
            const decodedCourseName = decodeURIComponent(courseName);
            const courses = await courseModel.searchCoursesByNameInMyLearning(userId, decodedCourseName);
            res.status(200).json(courses);
        } catch (error) {
            res.status(500).json({ error: "Failed to search courses by name." });
        }
    },

    
    async checkCourseInMyLearning(req, res) {
        const { userId, courseId } = req.query;
        
        if (!userId || !courseId) {
            return res.status(400).json({
                success: false,
                message: "Thiếu userId hoặc courseId"
            });
        }

        try {
            const exists = await mylearning.checkCourseInMyLearning(userId, courseId);
            res.status(200).json({
                success: true,
                exists: exists
            });
        } catch (error) {
            console.error("Lỗi khi kiểm tra khóa học trong MyLearning:", error);
            res.status(500).json({
                success: false,
                message: "Không thể kiểm tra khóa học trong MyLearning",
                error: error.message
            });
        }
    }
};
