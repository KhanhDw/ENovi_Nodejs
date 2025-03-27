require("dotenv").config();
const { executeQuery } = require("../config/query");

class paymentModel {
    
    static async addPaymentHistory(data) {
        const query = `
            INSERT INTO PaymentsHistory 
            (userId, courseId, amount, paymentMethod, status, paymentDate) 
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        const values = [
            data.userId,
            data.courseId,
            data.amount,
            data.paymentMethod,
            data.status,
            data.paymentDate
        ];
        return await executeQuery(query, values);
    }

    static async getPaymentHistoryByCourseTitleAndUserId(title, userId) {
        const query = `
            SELECT ph.*, c.title AS courseTitle 
            FROM PaymentsHistory ph
            INNER JOIN Courses c ON ph.courseId = c.id
            WHERE c.title = ? AND ph.userId = ?
        `;
        const values = [title, userId];
        return await executeQuery(query, values);
    }

    static async getPaymentHistoryByUserId(userId) {
        const query = `
            SELECT ph.*, c.title AS courseTitle 
            FROM PaymentsHistory ph
            INNER JOIN Courses c ON ph.courseId = c.id
            WHERE  ph.userId = ?
        `;
        const values = [userId];
        return await executeQuery(query, values);
    }
}   

module.exports = paymentModel;
