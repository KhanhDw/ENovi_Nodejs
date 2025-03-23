const CourseDetailModel = require("../models/course_detailModel");

const getCourseDetailByTitle = async (req, res) => {
    try {
        const { id, title } = req.params;
        const userId = req.query.userId;
        // console.log(" id: "+ id )
        // console.log("user id: "+ userId )
        // console.log(" title: "+ decodeURIComponent(title) )

        const course = await CourseDetailModel.getCourseDetailByTitle(decodeURIComponent(title), id);
        const totalCourses = await CourseDetailModel.getCountCoursesByInstructor(userId);
        console.log("totalCourses: "+ totalCourses[0].totalCourses)
        res.json({success: true, course: course, totalCourses: totalCourses[0].totalCourses});
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Lỗi khi lấy khóa học theo tiêu đề", 
            error,
        });
    }
};



module.exports = {
    getCourseDetailByTitle,
};
