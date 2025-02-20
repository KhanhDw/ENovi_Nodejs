const express = require("express");
const crypto = require("crypto");
const sendResetPasswordEmail = require("./../../services/SMTP/mailer");
const userModel = require("./../../models/userModel");

const router = express.Router();

router.post("/forgot-password", async (req, res) => {
    const { email } = req.body;
    // Kiểm tra xem email có tồn tại trong database không
    const userid = await userModel.getUserByEmail(email);
    if (userid.length === 0) {
        return res.status(404).json({ message: "Email không tồn tại" });
    }
    // Tạo token reset password
    const resetToken = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 3600); // Token hết hạn sau 10 phút
    // Lưu token vào database
    await userModel.updateTokenResetPasswordUser(email, resetToken, expiresAt);
    // Gửi email khôi phục mật khẩu
    await sendResetPasswordEmail(email, resetToken);
    res.json({ message: "Email khôi phục mật khẩu đã được gửi" });
});

module.exports = router;
