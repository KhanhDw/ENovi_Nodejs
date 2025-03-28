const paymentModel = require("../models/paymentModel");

// Lấy lịch sử thanh toán theo tiêu đề khóa học và userId
const getPaymentHistoryByCourseTitleAndUserId = async (req, res) => {
    const { title, userId } = req.query; // Use query parameters for RESTful API
    try {
        const paymentHistory =
            await paymentModel.getPaymentHistoryByCourseTitleAndUserId(
                title,
                userId
            );
        res.status(200).json({ success: true, data: paymentHistory });
    } catch (error) {
        console.error(
            "Error fetching payment history by course title and userId:",
            error
        );
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
        const paymentHistory = await paymentModel.getPaymentHistoryByUserId(
            userId
        );
        res.status(200).json({ success: true, data: paymentHistory });
    } catch (error) {
        console.error("Error fetching payment history by userId:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

const getEnrollmentBuyCourseByUserId = async (req, res) => {
    try {
        const { courseId } = req.params;
        console.log(courseId);
        if (!courseId) {
            return res.status(400).json({ message: "Course ID is required" });
        }

        const students = await paymentModel.getRegisteredStudentsByCourse(
            courseId
        );
        return res.status(200).json({ success: true, data: students });
    } catch (error) {
        console.error("Error fetching registered students:", error);
        return res
            .status(500)
            .json({ success: false, message: "Internal server error" });
    }
};

const createPaymentRequest = async (req, res) => {
    const { userId, amount } = req.body;
    try {
        const result = await paymentModel.createPaymentRequest(userId, amount);
        res.status(201).json({
            success: true,
            message: "Payment request created successfully",
            data: result,
        });
    } catch (error) {
        console.error("Error creating payment request:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

const getWithdrawalHistory = async (req, res) => {
    try {
        const { userId } = req.query;
        const history = await paymentModel.getWithdrawalHistoryInstructor(
            userId
        );
        return res.status(200).json({ success: true, data: history });
    } catch (error) {
        console.error("Error fetching withdrawal history:", error);
        return res
            .status(500)
            .json({ success: false, message: "Internal server error" });
    }
};

module.exports = {
    getPaymentHistoryByCourseTitleAndUserId,
    getPaymentHistoryByUserId,
    getEnrollmentBuyCourseByUserId,
    createPaymentRequest,
    getWithdrawalHistory,
};
