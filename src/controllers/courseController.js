const CourseModel = require("../models/courseModel");

const getCourseByTitle = async (req, res) => {
    try {
        const { title } = req.params;
        const course = await CourseModel.getCourseByTitle(title);
        res.json(course);
    } catch (error) {
        res.status(500).json({
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

const getCourseByInstructor = async (req, res) => {
    try {
        const { instructorName } = req.params;
        const course = await CourseModel.getCourseByInstructor(instructorName);
        res.json(course);
    } catch (error) {
        res.status(500).json({
            message: "Lỗi khi lấy khóa học theo giảng viên",
            error,
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

module.exports = {
    getCourseByTitle,
    getCourseByPrice,
    getCourseByLevel,
    getCourseByInstructor,
    getCourseByCategory,
    getCourseByCategoryV1,
    getCourseByCategoryV2,
};
