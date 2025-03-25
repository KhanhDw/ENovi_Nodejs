// Cấu hình VNPAY
require('dotenv').config(); // Dùng biến môi trường để bảo mật

module.exports = {
  vnp_TmnCode: process.env.VNPAY_TMN_CODE || '',
  vnp_HashSecret: process.env.VNPAY_HASH_SECRET || '',
  vnp_Url: process.env.VNPAY_URL || 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html',
  vnp_Api: process.env.VNPAY_API || 'https://sandbox.vnpayment.vn/merchant_webapi/api/transaction',
  vnp_ReturnUrl: process.env.VNPAY_RETURN_URL || 'https://localhost:4200/vnpay/order/vnpay_return',
  testMode: process.env.NODE_ENV !== 'production', // Sandbox nếu không phải production
  hashAlgorithm: 'SHA512',
};

