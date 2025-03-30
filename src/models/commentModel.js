require("dotenv").config();
const { executeQuery } = require("../config/query");

class commentModel {
    static async addComment(userId, courseId, content) {
        return await executeQuery(
            `INSERT INTO Comments (userId, courseId, content) 
             VALUES (?, ?, ?)`,
            [userId, courseId, content]
        );
    }

    static async deleteComment(commentId) {
        return await executeQuery(
            `DELETE FROM Comments 
             WHERE id = ?`,
            [commentId]
        );
    }
    static async getCommentsAndRatingByCourseId(courseId) {
        return await executeQuery(
            `SELECT 
            c.*, 
            r.rating,
            u.username,
            u.avatar
            FROM 
            Comments c
            LEFT JOIN 
            Rating r ON c.userId = r.userId AND c.courseId = r.courseId
            LEFT JOIN
            Users u ON c.userId = u.id
            WHERE 
            c.courseId = ?  
            ORDER BY 
            c.createdAt DESC;`,
            [courseId]
        );
    }
}   

module.exports = commentModel;
