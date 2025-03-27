require("dotenv").config();
const { executeQuery } = require("../config/query");

class LessionModel {
    static async getLessionBySectionId(sectionId) {
        return await executeQuery(
            `select id, sectionId, title, lessonOrder, nameFileVideo from lessons  where sectionId = ? ;`,
            [sectionId]
        );
    }
    static async deleteLessonById(lessonId) {
        return await executeQuery(
            `DELETE FROM lessons WHERE id = ?;`,
            [lessonId]
        );
    }
    static async updateTitleLessonByLessonId(title, lessonId) {
        return await executeQuery(`UPDATE lessons SET title=? WHERE id = ?;`, [
            title,
            lessonId,
        ]);
    }
    static async updateNameVideoLessonByLessonId(namevideo, lessonId) {
        return await executeQuery(
            `UPDATE lessons SET nameFileVideo=? WHERE id = ?;`,
            [namevideo, lessonId]
        );
    }
    static async getSumLessonInCourseByCourseId(courseId) {
        return await executeQuery(
            `select count(courseId) as sumLesson from lessons where courseId = ? `,
            [courseId]
        );
    }
    static async createLesson(sectionId, courseId) {
        // Lấy lessonOrder lớn nhất của sectionId, courseId
        const getMaxLessonOrderQuery = `
            SELECT COALESCE(MAX(lessonOrder), 0) + 1 AS nextLessonOrder
            FROM lessons
            WHERE sectionId = ? AND courseId = ?;
        `;
    
        const insertLessonQuery = `
            INSERT INTO lessons (title, lessonOrder, sectionId, courseId) 
            VALUES (?, ?, ?, ?);
        `;
    
        // Thực hiện truy vấn
        try {
            // Lấy giá trị nextLessonOrder
            const [rows] = await executeQuery(getMaxLessonOrderQuery, [sectionId, courseId]);
            const nextLessonOrder = rows[0]?.nextLessonOrder || 1; // Nếu chưa có bài học nào thì bắt đầu từ 1
    
            // Chèn bản ghi mới
            await executeQuery(insertLessonQuery, ["Yêu cầu thay đổi", nextLessonOrder, sectionId, courseId]);
    
            return { message: "Lesson created successfully", lessonOrder: nextLessonOrder };
        } catch (error) {
            console.error("Error creating lesson:", error);
            throw error;
        }
    }

    static async getLessonToWatch(sectionId, lectureId, courseId) {
        return await executeQuery(
            `SELECT * FROM lessons WHERE sectionId = ? AND courseId = ? AND id = ?;`,
            [sectionId, courseId, lectureId]
        );
    }
    
}

module.exports = LessionModel;
