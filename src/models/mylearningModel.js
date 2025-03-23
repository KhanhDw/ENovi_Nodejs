require("dotenv").config();
const { executeQuery } = require("../config/query");

class MylearningModel {
   
    async addToMyLearning(userId, courseId) {
        const query = `
            INSERT INTO MyLearning (userId, courseId)
            VALUES (?, ?);
        `;
        try {
            await executeQuery(query, [userId, courseId]);
            console.log("Data added to MyLearning successfully.");
        } catch (error) {
            console.error("Error adding data to MyLearning:", error);
        }
    }

    async getMyLearningByUserId(userId) {
        const query = `
            SELECT 
                c.id,
                c.title,
                c.img
            FROM MyLearning AS ml
            JOIN Courses AS c ON ml.courseId = c.id
            WHERE ml.userId = ?;
        `;
        try {
            const result = await executeQuery(query, [userId]);
            return result;
        } catch (error) {
            console.error("Error fetching MyLearning data:", error);
            throw error;
        }
    }


    async removeFromMyLearning(userId, courseId) {
        const query = `
            DELETE FROM MyLearning
            WHERE userId = ? AND courseId = ?;
        `;
        try {
            await executeQuery(query, [userId, courseId]);
            console.log("Data removed from MyLearning successfully.");
        } catch (error) {
            console.error("Error removing data from MyLearning:", error);
            throw error;
        }
    }

    async checkCourseInMyLearning(userId, courseId) {
        const query = `
            SELECT COUNT(*) as count 
            FROM MyLearning 
            WHERE userId = ? AND courseId = ?;
        `;
        try {
            const result = await executeQuery(query, [userId, courseId]);
            return result[0].count > 0;
        } catch (error) {
            console.error("Lỗi khi kiểm tra khóa học trong MyLearning:", error);
            throw error;
        }
    }
    
}

module.exports = MylearningModel;
