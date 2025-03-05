const CourseModel = require("../models/courseModel");

const searchCoursesByTitle = async (req, res) => {
    try {
        const queryParams = {
            title: req.query.title || "",
            rating: req.query.rating ? parseFloat(req.query.rating) : null,
            language: req.query.language || "",
            duration: req.query.duration || "",
            level: req.query.level || "",
            price: req.query.price ? parseFloat(req.query.price) : null,
            page: req.query.page ? parseInt(req.query.page) : 1,
        };


        // console.warn('title: '+queryParams.title);
        // console.warn('rating: '+queryParams.rating);
        // console.warn('language: '+queryParams.language);
        // console.warn('duration: '+queryParams.duration);
        // console.warn('level: '+queryParams.level);
        // console.warn('price: '+queryParams.price);
        // console.warn('page: '+queryParams.page);


        // loại bỏ các thuộc tính không cần thiết
        const filteredParams = Object.fromEntries(
            Object.entries(queryParams).filter(([_, value]) => value !== "" && value !== null  && value !== undefined  && value !== -1)
        );

        console.log("....1..."+Object.keys(filteredParams));

        console.warn('filteredParams title: '+filteredParams.title);
        console.warn('filteredParams rating: '+filteredParams.rating);
        console.warn('filteredParams language: '+filteredParams.language);
        console.warn('filteredParams duration: '+filteredParams.duration);
        console.warn('filteredParams level: '+filteredParams.level);
        console.warn('filteredParams price: '+filteredParams.price);
        console.warn('filteredParams page: '+filteredParams.page);




        const { totalItem, course } = await CourseModel.searchCoursesMD(
            filteredParams
        );

        console.warn('totalItem:'+totalItem);


        res.status(200).json({
            success: true,
            total: totalItem,
            currentPage: queryParams.page,
            courses: course,
        });
    } catch (error) {
        res.status(500).json({
            message: "Lỗi khi tìm kiếm khóa học",
            error: error.message,
        });
    }
};

module.exports = {
    searchCoursesByTitle,
};
