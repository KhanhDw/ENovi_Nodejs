const express = require("express");
const crypto = require("crypto");
const sendResetPasswordEmail = require("./../../services/SMTP/mailer");
const userModel = require("./../../models/userModel");
const checkEmail = require("./../../utils/CheckEmailValid");
const { DateTime } = require("luxon");
const bcrypt = require("bcrypt");

const router = express.Router();

router.post("/forgot-password", async (req, res) => {
    const { email } = req.body;
    console.log(email);
    if (email !== undefined || email !== "") {
        if (checkEmail(email) === false)
            return res.status(400).json({ message: "Email không hợp lệ" });

        // Kiểm tra xem email có tồn tại trong database không
        const userid = await userModel.getUserByEmail(email);
        if (!userid || userid.length === 0) {
            return res.status(404).json({ message: "Email không tồn tại" });
        }
        // Tạo token reset password
        const resetToken = crypto.randomBytes(32).toString("hex");
        const hashedResetToken = await bcrypt.hash(resetToken, 5); // 5 là số rounds
        console.log("hashedResetToken: ", hashedResetToken);
        const expiresAt = DateTime.now()
            .setZone("Asia/Ho_Chi_Minh") // Chuyển về múi giờ Việt Nam
            .plus({ minutes: 10 }) // Cộng 10 phút
            .toFormat("yyyy-MM-dd HH:mm:ss"); // Định dạng cho MySQL
        // Lưu token vào database
        await userModel.updateTokenResetPasswordUser(
            email,
            hashedResetToken,
            expiresAt
        );
        // Gửi email khôi phục mật khẩu
        await sendResetPasswordEmail(email, resetToken); // token ban đầu chưa hash
        res.json({ message: "Email khôi phục mật khẩu đã được gửi" });
    }
});

module.exports = router;
