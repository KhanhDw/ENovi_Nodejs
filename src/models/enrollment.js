require("dotenv").config();
const { executeQuery } = require("../config/query");

class EnrollmentModel {
    static async checkEnrollment(userId, courseId) {
        try {
            const result = await executeQuery(
                `SELECT * FROM Enrollments 
                WHERE userId = ? AND courseId = ?`,
                [userId, courseId]
            );
            return result.length > 0;
        } catch (error) {
            return {
                success: false,
                message: "Lỗi khi kiểm tra đăng ký khóa học",
                error: error
            };
        }
    }

    static async getEnrollmentsByUserId(userId) {
        try {
            const enrollments = await executeQuery(
                `SELECT e.*, c.title, c.img, c.price 
                FROM Enrollments e
                JOIN Courses c ON e.courseId = c.id
                WHERE e.userId = ?
                ORDER BY e.enrolledAt DESC`,
                [userId]
            );
            return {
                success: true,
                data: enrollments
            };
        } catch (error) {
            return {
                success: false,
                message: "Lỗi khi lấy danh sách khóa học đã đăng ký",
                error: error
            };
        }
    }

    static async addEnrollment(userId, courseId) {
        try {
            const values = courseId.map(id => [userId, id]);
            const placeholders = values.map(() => '(?, ?)').join(', ');
            const flattenedValues = values.flat();
            const result = await executeQuery(
                `INSERT INTO Enrollments (userId, courseId) 
                VALUES ${placeholders}`,
                flattenedValues
            );
            
            if (result.affectedRows > 0) {
                return {
                    success: true,
                    message: "Thêm đăng ký khóa học thành công",
                    enrollmentId: result.insertId
                };
            } else {
                return {
                    success: false,
                    message: "Không thể thêm đăng ký khóa học"
                };
            }
        } catch (error) {
            return {
                success: false,
                message: "Lỗi khi thêm đăng ký khóa học", 
                error: error
            };
        }
    }
}   

module.exports = EnrollmentModel;
