require("dotenv").config();
const { executeQuery } = require("../config/query");
const moment = require("moment");
const generateRandomString = require("../utils/random");
const bcrypt = require("bcrypt");

class UserModel {
    static async getAllUsers() {
        return await executeQuery("SELECT * FROM users");
    }

    static async getUserById(id) {
        return await executeQuery("SELECT * FROM users WHERE id = ?;", [id]);
    }
    static async searchUsers(keyword) {
        const sql = `SELECT * FROM users WHERE username LIKE ? OR email LIKE ? OR role LIKE ?`;
        const searchPattern = `%${keyword}%`;
        return await executeQuery(sql, [
            searchPattern,
            searchPattern,
            searchPattern,
        ]);
    }

    static async getUserByEmail(email) {
        return await executeQuery(
            "SELECT users.id FROM users WHERE email = ?",
            [email]
        );
    }
    static async getUserByEmailLogin(email) {
        return await executeQuery(
            `SELECT 
                users.id,
                users.email,
                users.username,
                users.password,
                users.avatar,
                users.role,
                users.website   ,
                users.biography
            FROM 
                users WHERE email = ?;`,
            [email]
        );
    }
    static async getUserByUserName(username) {
        return await executeQuery(
            `SELECT 
                users.id,
                users.email,
                users.username,
                users.password,
                users.avatar,
                users.role,
                users.website,  
                users.biography 
            FROM 
                users 
            WHERE 
                username = ?;`,
            [username]
        );
    }

    static async getUserByGoogleID(googleid) {
        return await executeQuery("SELECT id FROM users WHERE googleId = ?", [
            googleid,
        ]);
    }

    static async createUserGoogle(googleId, username, email, img) {
        const now = moment().format("YYYY-MM-DD HH:mm:ss");
        const randomPassword = await bcrypt.hash(generateRandomString(10), 5);
        return await executeQuery(
            "INSERT INTO users ( googleId, username, email, password, avatar, role, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [googleId, username, email, randomPassword, img, "student", now]
        );
    }

    static async createUserENovi(username, password, email) {
        const now = moment().format("YYYY-MM-DD HH:mm:ss");
        return await executeQuery(
            "INSERT INTO users ( googleId, username, email, password, avatar, role, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [null, username, email, password, null, "student", now]
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

    static async CheckTokenResetValid(email) {
        try {
            return await executeQuery(
                "SELECT id, reset_token, reset_expires FROM users WHERE  email=?",
                [email]
            );
        } catch (error) {
            console.error(
                "CheckTokenResetValid - Lỗi khi kiểm tra token:",
                error
            );
            throw error; // Ném lỗi để router xử lý
        }
    }

    static async updateTokenResetPasswordUser(email, resetToken, expiresAt) {
        try {
            return await executeQuery(
                "UPDATE users SET reset_token = ?, reset_expires = ? WHERE email = ?",
                [resetToken, expiresAt, email]
            );
        } catch (error) {
            console.error(
                "updateTokenResetPasswordUser - Lỗi khi cập nhật mật khẩu:",
                error
            );
            throw error;
        }
    }

    static async updatePasswordUser(hashedPassword, email) {
        try {
            return await executeQuery(
                "UPDATE users SET password = ?, reset_token = NULL, reset_expires = NULL WHERE email = ?",
                [hashedPassword, email]
            );
        } catch (error) {
            console.error(
                "updatePasswordUser - Lỗi khi cập nhật mật khẩu:",
                error
            );
            throw error;
        }
    }

    static async updateRoleUserToInstrutor(id) {
        try {
            return await executeQuery(
                "UPDATE Users SET role = 'instructor' WHERE id = ?",
                [id]
            );
        } catch (error) {
            console.error("Lỗi khi nâng cấp user thành giảng viên:", error);
            throw error;
        }
    }

    static async deleteUser(id) {
        return await executeQuery("DELETE FROM users WHERE id = ?", [id]);
    }
    static async countUserRegiterInMonth(year) {
        console.log("year:" + year);
        return await executeQuery(
            `
            SELECT
                DATE_FORMAT(createdAt, '%Y-%m') AS month,
                COUNT(*) AS user_count
            FROM
                Users
            WHERE
                YEAR(createdAt) = ?
            GROUP BY
                month
            ORDER BY
                month;
            `,
            [year]
        );
    }

    static async updateUserImage(imageUrl, userId) {
        try {
            return await executeQuery(
                "UPDATE Users SET avatar = ? WHERE id = ?",
                [imageUrl, userId]
            );
        } catch (error) {
            console.error("Lỗi khi cập nhật ảnh người dùng:", error);
            throw error;
        }
    }


    static async getUserAvatar(userId) {
        try {
            const [result] = await executeQuery(
                "SELECT avatar FROM Users WHERE id = ?",
                [userId]
            );
            return result.avatar;
        } catch (error) {
            console.error("Lỗi khi lấy avatar người dùng:", error);
            throw error;
        }
    }



    static async getTotalUsers() {
        try {
            const [result] = await executeQuery(
                "SELECT COUNT(*) AS total FROM users"
            );
            return result.total;
        } catch (error) {
            console.error("Lỗi khi lấy tổng số người dùng:", error);
            throw error;
        }
    }


    static async getTotalInstructors() {
        try {
            const [result] = await executeQuery(
                "SELECT COUNT(*) AS total FROM users WHERE role = 'instructor'"
            );
            return result.total;
        } catch (error) {
            console.error("Lỗi khi lấy tổng số giảng viên:", error);
            throw error;
        }
    }


    static async updateUserProfile(id, username, website, biography) {
        try {

            console.log(id, username, website, biography);

            return await executeQuery(
                "UPDATE users SET username = ?, website = ?, biography = ? WHERE id = ?",
                [username, website, biography, id]
            );
        } catch (error) {
            console.error("Lỗi khi cập nhật thông tin người dùng:", error);
            throw error;
        }
    }
}

module.exports = UserModel;
