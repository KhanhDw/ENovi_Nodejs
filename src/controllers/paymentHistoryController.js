const paymentModel = require("../models/paymentModel");

// Lấy lịch sử thanh toán theo tiêu đề khóa học và userId
const getPaymentHistoryByCourseTitleAndUserId = async (req, res) => {
    const { title, userId } = req.query; // Use query parameters for RESTful API
    try {
        const paymentHistory = await paymentModel.getPaymentHistoryByCourseTitleAndUserId(title, userId);
        res.status(200).json({ success: true, data: paymentHistory });
    } catch (error) {
        console.error("Error fetching payment history by course title and userId:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

// Get payment history by userId
const getPaymentHistoryByUserId = async (req, res) => {
    const { userId } = req.params; // Use path parameters for RESTful API
    try {
        const paymentHistory = await paymentModel.getPaymentHistoryByUserId(userId);
        res.status(200).json({ success: true, data: paymentHistory });
    } catch (error) {
        console.error("Error fetching payment history by userId:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

module.exports = {
    getPaymentHistoryByCourseTitleAndUserId,
    getPaymentHistoryByUserId,
};
