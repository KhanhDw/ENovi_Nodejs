require("dotenv").config();
const { executeQuery } = require("../config/query");

class paymentmethodModel {
    static async addPaymentMethod(data) {
        const query = `
            INSERT INTO payment_methods 
            (user_id, bank_id, account_holder_name, bank_account_number, phone_number, email) 
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        const params = [
            data.user_id,
            data.bank_id,
            data.account_holder_name,
            data.bank_account_number,
            data.phone_number,
            data.email
        ];
        return await executeQuery(query, params);
    }

    static async updatePaymentMethod(user_id, data) {
        const query = `
            UPDATE payment_methods 
            SET 
                bank_id = ?, 
                account_holder_name = ?, 
                bank_account_number = ?, 
                phone_number = ?, 
                email = ? 
            WHERE user_id = ?
        `;
        const params = [
            data.bank_id,
            data.account_holder_name,
            data.bank_account_number,
            data.phone_number,
            data.email,
            user_id
        ];
        return await executeQuery(query, params);
    }
    static async isUserExists(user_id) {
        const query = `
            SELECT COUNT(*) as count 
            FROM payment_methods 
            WHERE user_id = ?
        `;
        const params = [user_id];
        const result = await executeQuery(query, params);
        return result[0].count > 0;
    }


    static async getPaymentMethodByUserId(user_id) {
        const query = `
            SELECT * 
            FROM payment_methods 
            WHERE user_id = ?
        `;
        const params = [user_id];
        const result = await executeQuery(query, params);
        return result.length > 0 ? result[0] : null;
    }
}   

module.exports = paymentmethodModel;
