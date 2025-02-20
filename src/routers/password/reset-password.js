const Encryption = require("./../../utils/PasswordEncryption");
const userModel = require("./../../models/userModel");
const express = require("express");
const router = express.Router();

router.post("/reset-password", async (req, res) => {
    const { token, newPassword } = req.body;

    // Kiểm tra token trong database
    const user = await userModel.CheckTokenValid(token);

    if (user.length === 0 || new Date(user[0].reset_expires) < new Date()) {
        return res
            .status(400)
            .json({ message: "Token không hợp lệ hoặc đã hết hạn" });
    }

    // Mã hóa mật khẩu mới
    // const hashedPassword = await bcrypt.hash(newPassword, 32);
    const hashedPassword = Encryption(newPassword);

    // Cập nhật mật khẩu và xóa token
    await userModel.updatePasswordUser(hashedPassword, token);

    res.json({ message: "Mật khẩu đã được đặt lại thành công" });
});

module.exports = router;
