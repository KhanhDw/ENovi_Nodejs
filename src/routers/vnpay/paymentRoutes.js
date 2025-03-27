// Định tuyến API thanh toán vnpay

/**
 * Created by CTT VNPAY
 */

const express = require('express');
const router = express.Router();
const orderController = require('../../controllers/vnpay/paymentController');

// Routes cho đơn hàng
router.get('/', orderController.getOrderList);
router.get('/create_payment_url', orderController.getCreatePayment);
router.post('/create_payment_url', orderController.createPaymentUrl);
router.get('/vnpay_return', orderController.vnpayReturn);
router.get('/vnpay_ipn', orderController.vnpayIPN);

// Routes cho truy vấn kết quả thanh toán
router.get('/querydr', orderController.getQueryDR);
router.post('/querydr', orderController.queryDR);

// Routes cho hoàn tiền
router.get('/refund', orderController.getRefund);
router.post('/refund', orderController.refund);



module.exports = router;