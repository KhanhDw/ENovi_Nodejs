const UserModel = require("../models/userModel");

const getAllUsers = async (req, res) => {
    try {
        const users = await UserModel.getAllUsers();
        res.status(200).json({success:  true, users: users});
    } catch (error) {
        res.status(500).json({
            message: "Lỗi khi lấy danh sách người dùng",
            error,
        });
    }
};


module.exports = {
    getAllUsers,
};
