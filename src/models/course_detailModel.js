require("dotenv").config();
const { executeQuery } = require("../config/query");

class CourseDetailModel {
    static async getCourseDetailByTitle(title, id) {
        return await executeQuery(
            `SELECT 
            c.id AS id,
            c.title,
            c.price,
            c.level,
            c.instructorId,
            u.username AS instructorName, 
            u.avatar AS instructorAvatar,
            u.biography AS instructorBiography,
            c.status,
            c.createdAt,
            c.updatedAt,
            c.img,
            c.duration,
            c.rating,
            c.languages,
            c.subtitles,
            c.code_discount,
            c.percent_discount,
            c.intro_video,
            cd.overview,
            cd.description,
            cd.requirements,    
            cd.whatToLearn,
            l.language_name AS languageName,
            (SELECT COUNT(*) FROM Enrollments e WHERE e.courseId = c.id) AS totalStudents
            FROM Courses c
            LEFT JOIN CourseDetails cd ON c.id = cd.courseId
            LEFT JOIN Users u ON c.instructorId = u.id
            LEFT JOIN Languages l ON l.language_code = c.languages
            WHERE c.title = ? AND c.id = ?;
            `, [title, id]
        );
    }

    static async getCountCoursesByInstructor(instructorId) {
        return await executeQuery(
            `SELECT 
                COUNT(*) as totalCourses        
            FROM Courses
            WHERE instructorId = ?;`,
            [instructorId]
        );
    }
}

module.exports = CourseDetailModel;
