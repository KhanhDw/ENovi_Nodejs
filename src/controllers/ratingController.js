const ratingModel = require("../models/ratingModel");
const addRating = async (req, res) => {
    const { userId, courseId, rating } = req.body;

    try {
        // Call the model's addRating method
        await ratingModel.addRating(userId, courseId, rating);

        return res.json({ success: true, message: "Rating added successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

const getTotalRatings = async (req, res) => {
    const { courseId } = req.params;

    try {
        // Call the model's method to get total ratings
        const totalRatings = await ratingModel.getTotalRatings(courseId);

        return res.json({ success: true, totalRatings });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};


const getRatingsBreakdown = async (req, res) => {
    const { courseId } = req.params;

    try {
        // Call the model's method to get ratings breakdown
        const breakdown = await ratingModel.getRatingsBreakdown(courseId);

        console.log("....>>"+breakdown);
        // Ensure the breakdown is an array of 5 elements

        return res.json({ success: true, breakdown });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    addRating,getTotalRatings,getRatingsBreakdown
};
