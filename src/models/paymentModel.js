require("dotenv").config();
const { executeQuery } = require("../config/query");

class paymentModel {
    static async addPaymentHistory(dataArray) {
        const query = `
        INSERT INTO PaymentsHistory 
        (userId, courseId, amount, paymentMethod, status, paymentDate) 
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    const paymentItems = Array.isArray(dataArray) ? dataArray : [dataArray];
    console.log("dataArray", paymentItems);

    for (const data of paymentItems) {
        if (!data.userId || !data.courseId || !data.amount || !data.paymentMethod || !data.status || !data.paymentDate) {
            throw new Error("Missing required fields for adding payment history");
        }

        const values = [
            parseInt(data.userId, 10),
            parseInt(data.courseId[0], 10), // Lấy courseId đầu tiên nếu là mảng
            parseFloat(data.amount),
            data.paymentMethod,
            data.status,
            new Date(data.paymentDate),
        ];

        await executeQuery(query, values);
    }
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
        console.log("userId: " + userId);
        let query = `
            SELECT 
                pr.id AS request_id, 
                pr.user_id AS userId, 
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
        `;

        const values = [];
        if (parseInt(userId, 10) !== -1) {
            query += ` WHERE pr.user_id = ?`;
            values.push(parseInt(userId, 10));
        }

        query += ` ORDER BY pr.created_at DESC`;
        // console.log("SQL Query:", query, values);

        return await executeQuery(query, values);
    }
    static async getWithdrawalHistoryInstructor_confirmed(userId) {
        console.log("userId1: " + userId);

        let query = `
            SELECT 
            pr.id AS request_id, 
            pr.user_id AS userId, 
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
            WHERE pr.status = 'completed'
        `;

        const values = [];
        if (parseInt(userId, 10) !== -1) {
            query += ` AND pr.user_id = ?`;
            values.push(parseInt(userId, 10));
        }

        query += ` ORDER BY pr.created_at DESC`;
        // console.log("SQL Query11111:", query, values);

        return await executeQuery(query, values);
    }

    static async updatePaymentStatus(paymentHistoryId, newStatus) {
        const validStatuses = ["completed", "rejected", "approved"];
        if (!validStatuses.includes(newStatus)) {
            throw new Error(
                "Invalid status. Valid statuses are: 'completed', 'rejected', 'approved'."
            );
        }

        const query = `
            UPDATE payment_requests
            SET status = ?
            WHERE id = ?
        `;
        const values = [newStatus, paymentHistoryId];
        return await executeQuery(query, values);
    }

    // ===============================
    //  Calculate Total Revenue of the System
    // ===============================
    static async calculateTotalRevenue() {
        const query = `
            SELECT SUM(amount) AS totalRevenue 
            FROM PaymentsHistory
        `;
        const result = await executeQuery(query);
        return result[0]?.totalRevenue || 0;
    }

    static async calculateMonthlyRevenue() {
        const query = `
            SELECT 
                MONTH(paymentDate) AS month, 
                YEAR(paymentDate) AS year, 
                SUM(amount) AS totalRevenue 
            FROM PaymentsHistory
            GROUP BY YEAR(paymentDate), MONTH(paymentDate)
            ORDER BY YEAR(paymentDate), MONTH(paymentDate)
        `;
        const result = await executeQuery(query);

        const monthlyRevenue = Array(12).fill(0);
        result.forEach((row) => {
            if (row.year === new Date().getFullYear()) {
                monthlyRevenue[row.month - 1] = parseFloat(row.totalRevenue);
            }
        });

        return monthlyRevenue;
    }
}

module.exports = paymentModel;
