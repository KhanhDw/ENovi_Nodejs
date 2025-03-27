const express = require("express");
const paymentController = require("../controllers/paymentHistoryController");

const router = express.Router();

router.get('/payment_history_by_user/:userId', paymentController.getPaymentHistoryByUserId);
router.get('/payment_history_by_course', paymentController.getPaymentHistoryByCourseTitleAndUserId);
   
module.exports = router;
