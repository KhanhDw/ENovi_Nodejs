require("dotenv").config();
const { executeQuery } = require("../config/query");
const moment = require("moment");
const generateRandomString = require("../utils/random");
const Encryption = require("../utils/PasswordEncryption");

class UserModel {
    static async getAllUsers() {
        return await executeQuery("SELECT * FROM users");
    }

    static async getUserById(id) {
        return await executeQuery("SELECT * FROM users WHERE id = ?", [id]);
    }
    static async getUserByGoogleID(googleid) {
        return await executeQuery(
            "SELECT users.id FROM users WHERE googleId = ?",
            [googleid]
        );
    }

    static async createUserGoogle(googleId, username, email, img) {
        const now = moment().format("YYYY-MM-DD HH:mm:ss");
        const randomPassword = Encryption(generateRandomString(10));
        return await executeQuery(
            "INSERT INTO users ( googleId, username, email, password, avatar, role, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [googleId, username, email, randomPassword, img, "student", now]
        );
    }

    static async findUserByGoogleId(googleId) {
        console.log("googleId:" + googleId);
        try {
            const query = "SELECT * FROM users WHERE googleId = ?";
            const results = await executeQuery(query, [googleId.toString()]);

            // Nếu bạn muốn trả về một user duy nhất, bạn có thể kiểm tra kết quả
            if (results && results.length > 0) {
                // console.log("result truy vấn đăng nhập: " + results[0]);
                return results[0]; // Trả về user đầu tiên tìm thấy
            } else {
                return null; // Trả về null nếu không tìm thấy user
            }
        } catch (error) {
            console.error("Lỗi khi tìm user theo Google ID:", error);
            throw error; // Ném lỗi để xử lý ở nơi gọi hàm
        }
    }

    static async updateUser(id, name, email) {
        return await executeQuery(
            "UPDATE users SET name = ?, email = ? WHERE id = ?",
            [name, email, id]
        );
    }

    static async deleteUser(id) {
        return await executeQuery("DELETE FROM users WHERE id = ?", [id]);
    }
}

module.exports = UserModel;
