require("dotenv").config();
const { executeQuery } = require("../config/query");

class ratingModel {
    static async addRating(userId, courseId, rating) {
        // Insert the new rating into the Rating table
        const insertQuery = `
            INSERT INTO Rating (userId, courseId, rating)
            VALUES (?, ?, ?);
        `;
        await executeQuery(insertQuery, [userId, courseId, rating]);

        // Calculate the average rating for the course
        const avgQuery = `
            SELECT AVG(rating) AS avgRating
            FROM Rating
            WHERE courseId = ?;
        `;
        const result = await executeQuery(avgQuery, [courseId]);
        const avgRating = result[0].avgRating;


        // Update the course's rating in the Courses table
        const updateQuery = `
            UPDATE Courses
            SET rating = ?
            WHERE id = ?;
        `;
        await executeQuery(updateQuery, [avgRating, courseId]);
    }

    static async getTotalRatings(courseId) {
        // Query to count the total number of ratings for the course
        const countQuery = `
            SELECT COUNT(*) AS totalRatings
            FROM Rating
            WHERE courseId = ?;
        `;
        const result = await executeQuery(countQuery, [courseId]);
        return result[0].totalRatings;
    }


    static async getRatingsBreakdown(courseId) {
        // Query to get the count of each rating (1 to 5 stars) for the course
        const breakdownQuery = `
            SELECT rating, COUNT(*) AS count
            FROM Rating
            WHERE courseId = ?
            GROUP BY rating;
        `;
        const results = await executeQuery(breakdownQuery, [courseId]);

        // Initialize an array with 0 counts for ratings 1 to 5
        const breakdown = [0, 0, 0, 0, 0];

        // Populate the array with the counts from the query results
        results.forEach(row => {
            breakdown[row.rating - 1] = row.count;
        });

        return breakdown;
    }
}   

module.exports = ratingModel;
