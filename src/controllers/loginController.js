const UserModel = require("../models/userModel");

const bcrypt = require("bcrypt");

const getUsersLogin = async (req, res) => {
    const { email, password } = req.body;

    if (
        email !== undefined ||
        email !== "" && password !== undefined ||
        password !== ""
    ) {
        console.log(email, password);

        try {
            const users = await UserModel.getUserByEmailLogin(email);

            console.log(users);

            if (users.length === 0) {
                return res.status(404).json({
                    message: "Tài khoản không tồn tại",
                });
            }

            const isPasswordValid = await bcrypt.compare(
                password,
                users[0].password
            );

            if (isPasswordValid) {
                // Trường hợp thành công
                return res.status(200).json({
                    success: true,
                    message: "Đăng nhập thành công",
                    user: users,
                });
            } else {
                res.status(200).json({
                    success: false,
                    message: "Mật khẩu không chính xác",
                    user: null,
                });
            }
        } catch (error) {
            console.log("Lỗi khi đăng nhập người dùng:", error);
            return res.status(500).json({
                message: "Lỗi khi đăng nhập người dùng",
                success: false,
                error: error.json,
            });
        }
    }
};

module.exports = {
    getUsersLogin,
};
