const bcrypt = require("bcrypt");
const userModel = require("./../../models/userModel");
const express = require("express");
const router = express.Router();

router.post("/reset-password", async (req, res) => {
    const { token, newPassword, email } = req.body;

    if (!token || !newPassword || !email) {
        return res.status(400).json({ message: "Thiếu thông tin yêu cầu!" });
    }

    console.log("reset pass: " + token, newPassword, email);
    try {
        // Kiểm tra token trong database và get user đó ra
        const user = await userModel.CheckTokenResetValid(email);

        console.log("user: ", user.length);

        if (user.length === 0) {
            console.log("không có Token");
            return res.status(404).json({ message: "không có Token" });
        }

        const { idSQL, reset_tokenSQL, reset_expiresSQL } = await user[0];

        console.log("idSQL: ", user[0].id);
        console.log("reset_tokenSQL: ", user[0].reset_token);
        console.log("reset_expiresSQL: ", user[0].reset_expires);

        const resetExpires = new Date(reset_expiresSQL).getTime();
        const now = new Date().getTime();
        if (resetExpires < now) {
            return res.status(401).json({
                message: "Token đã hết hạn",
                success: false,
            });
        }

        // Kiểm tra token có hợp lệ không
        try {
            const isTokenValid = await bcrypt.compare(
                token,
                user[0].reset_token
            );
            if (!isTokenValid) {
                return res.status(401).json({ message: "Token không hợp lệ" });
            }
        } catch (error) {
            console.log("Lỗi so sánh token: ", error);
        }

        // // kiểm tra token hết hạn chưa
        try {
            if (resetExpires > now) {
                return res.status(401).json({
                    message: "Token  đã hết hạn",
                    success: false,
                });
            }
        } catch (error) {
            console.log("Lỗi so sánh token: ", error);
        }

        try {
            // Mã hóa mật khẩu mới
            const hashedPassword = await bcrypt.hash(newPassword, 5);

            // Cập nhật mật khẩu và xóa token
            await userModel.updatePasswordUser(hashedPassword, email);
            res.json({
                message: "Mật khẩu đã được đặt lại thành công",
                success: true,
            });
        } catch (error) {
            console.error("Lỗi khi cập nhật mật khẩu: backend", error);
        }
    } catch (error) {
        console.error("Lỗi khi đặt lại mật khẩu: backend", error);
        res.status(500).json({
            message: "Đã có lỗi xảy ra khi đặt lại mật khẩu111",
            success: false,
        });
    }
});

module.exports = router;
