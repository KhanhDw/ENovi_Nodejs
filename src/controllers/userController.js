const UserModel = require("../models/userModel");

const getAllUsers = async (req, res) => {
    try {
        const users = await UserModel.getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({
            message: "Lỗi khi lấy danh sách người dùng",
            error,
        });
    }
};

const putUserRegister = async (req, res) => {
    try {
        const users = await UserModel.createUser();
        res.json(users);
    } catch (error) {
        res.status(500).json({
            message: "Lỗi khi lấy danh sách người dùng",
            error,
        });
    }
};

module.exports = {
    getAllUsers,
    putUserRegister,
};
