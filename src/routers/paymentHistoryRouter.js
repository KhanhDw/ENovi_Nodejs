const express = require("express");
const paymentController = require("../controllers/paymentHistoryController");

const router = express.Router();

router.post('/create_payment_request', paymentController.createPaymentRequest);
router.get('/withdrawal_history', paymentController.getWithdrawalHistory);
router.get('/payment_history_by_course', paymentController.getPaymentHistoryByCourseTitleAndUserId);
router.get('/payment_history_by_user/:userId', paymentController.getPaymentHistoryByUserId);
router.get("/registered-students/:courseId", paymentController.getEnrollmentBuyCourseByUserId);
module.exports = router;
