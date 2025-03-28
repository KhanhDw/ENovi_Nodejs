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
            data.paymentDate,
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

    static async getRegisteredStudentsByCourse(userId) {
        const query = `
            SELECT ph.*, c.title AS courseTitle, pm.account_holder_name, pm.bank_account_number, pm.email
            FROM PaymentsHistory ph
            INNER JOIN Courses c ON ph.courseId = c.id
            INNER JOIN payment_methods pm ON ph.userId = pm.user_id
            WHERE ph.userId = ?
        `;
        const values = [userId];
        return await executeQuery(query, values);
    }

    // ===============================
    //  yêu cầu rút tiền từ giảng viên
    // ===============================

    static async createPaymentRequest(userId, amount) {
        const query1 = `
            SELECT id 
            FROM payment_methods 
            WHERE user_id = ?
        `;
        const values1 = [userId];
        const result = await executeQuery(query1, values1);

        if (result.length === 0) {
            throw new Error("Payment method not found for the user");
        }

        const paymentMethodId = result[0].id;

        const query = `
            INSERT INTO payment_requests (user_id, payment_method_id, amount) 
            VALUES (?, ?, ?)
        `;
        const values = [userId, paymentMethodId, amount];
        return await executeQuery(query, values);
    }


    static async getWithdrawalHistoryInstructor(userId) {
        const query = `
            SELECT 
                pr.id AS request_id, 
                pr.user_id, 
                pr.payment_method_id, 
                pr.amount, 
                pr.status, 
                pr.created_at AS request_created_at, 
                pr.updated_at AS request_updated_at, 
                b.nameBank AS bank_name,
                pm.account_holder_name, 
                pm.bank_account_number, 
                pm.email
            FROM payment_requests pr
            INNER JOIN payment_methods pm ON pr.payment_method_id = pm.id
            INNER JOIN Banks b ON pm.bank_id = b.id
            WHERE pr.user_id = ?
            ORDER BY pr.created_at DESC
        `;
        const values = [userId];
        return await executeQuery(query, values);
    }
}

module.exports = paymentModel;
