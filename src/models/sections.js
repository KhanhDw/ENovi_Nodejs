require("dotenv").config();
const { executeQuery } = require("../config/query");

class SectionModel {
    static async deleteSectionByCourseId(courseId, sectionOrder) {
        return await executeQuery(
            `DELETE FROM Sections WHERE courseId = ? and sectionOrder = ?;`,
            [courseId, sectionOrder]
        );
    }
    static async updateNameSectionByCourseId(title, courseId, sectionOrder) {
        return await executeQuery(
            `UPDATE Sections SET title=? WHERE courseId = ? and sectionOrder = ?;`,
            [title, courseId, sectionOrder]
        );
    }
    static async createSectionByCourseId(title, courseId, sectionOrder) {
        return await executeQuery(
            `INSERT INTO Sections (courseId, title, sectionOrder) 
            VALUES (?, ?, ?);`,
            [courseId, title, sectionOrder] 
        );
    }
    static async getSectionByCourseId( courseId) {
        return await executeQuery(
            `SELECT s.id, s.courseId, s.title, s.sectionOrder,  COUNT(l.id) as lessonCount
             FROM Sections s
             LEFT JOIN Lessons l ON s.id = l.sectionId
             WHERE s.courseId = ?
             GROUP BY s.id, s.courseId, s.title, s.sectionOrder;`,
            [courseId]
        );
    }
    static async getSectionIdByCourseId( courseId, sectionOrder) {
        return await executeQuery(
            `select id from Sections where courseId = ? and sectionOrder=?;`,
            [courseId, sectionOrder]
        );
    }
}

module.exports = SectionModel;
