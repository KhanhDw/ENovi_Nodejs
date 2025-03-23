require("dotenv").config();
const { executeQuery } = require("../config/query");

class CartModel {
    static async getListCourseInCartUserId(userId) {
        return await executeQuery(
            `SELECT 
            c.id,
            c.title,
            c.price,
            c.level,
            c.instructorId,
            c.status,
            c.createdAt,
            c.updatedAt,
            c.img,
            c.duration,
            c.rating,
            c.languages,
            c.subtitles,
            c.code_discount,
            c.percent_discount
            FROM cart AS cart
            JOIN Courses AS c ON cart.courseId = c.id
            WHERE cart.userId = ?
            ORDER BY cart.createdAt DESC;
            `, [userId]
        );
    }
    static async deleteCourseFromCart(userId, courseId) {
        return await executeQuery(
            `DELETE FROM cart 
            WHERE userId = ? AND courseId = ?;`,
            [userId, courseId]
        );
    }

    static async deleteMultipleCoursesFromCart(userId, courseIds) {
        console.log('courseId1s:' +  courseIds);
        console.log('userID:' +  userId);
      
        return await executeQuery(
            `DELETE FROM cart 
            WHERE userId = ? AND courseId IN (${courseIds});`,
            [userId]
        );
    }

    static async addCourseToCart(userId, courseId) {
        return await executeQuery(
            `INSERT INTO cart (userId, courseId) 
            VALUES (?, ?);`,
            [userId, courseId]
        );
    }


    static async isCourseInCart(userId, courseId) {
        const result = await executeQuery(
            `SELECT COUNT(*) as count 
            FROM cart 
            WHERE userId = ? AND courseId = ?;`,
            [userId, courseId]
        );
        return result[0].count > 0;
    }
}   

module.exports = CartModel;
