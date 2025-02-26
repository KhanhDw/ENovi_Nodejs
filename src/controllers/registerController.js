const UserModel = require("../models/userModel");

const bcrypt = require("bcrypt");

const RegisterUser = async (req, res) => {
    const { username, email, password } = req.body;

    console.log(this.username, this.email, this.password);

    if (
        email !== undefined ||
        password !== undefined ||
        username !== undefined ||
        email !== "" ||
        password !== "" ||
        username !== ""
    ) {
        try {
            const userExitEmail = await UserModel.getUserByEmailLogin(email);
            const userExitUsername = await UserModel.getUserByUserName(
                username
            );
            if (userExitEmail.length > 0) {
                return res.status(400).json({
                    message: "Email đã tồn tại",
                });
            } else if (userExitUsername.length > 0) {
                return res.status(400).json({
                    message: "Tên người dùng đã tồn tại",
                });
            }

            const isPasswordValid = await bcrypt.hash(password, 10);

            await UserModel.createUserENovi(username, isPasswordValid, email);

            if (isPasswordValid) {
                // Trường hợp thành công
                return res.status(200).json({
                    success: true,
                    message: "Đăng ký thành công",
                });
            }
        } catch (error) {
            console.log("Lỗi đăng ký người dùng:", error);
            return res.status(500).json({
                message: "Lỗi đăng ký người dùng",
                success: false,
                error: error.json,
            });
        }
    }
};

module.exports = {
    RegisterUser,
};
