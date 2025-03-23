const UserModel = require("../models/userModel");
const { saveBase64Image } = require("../services/img/saveImage"); // Import saveImage

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
const deleteUser = async (req, res) => {
    try {
        const { id } = req.query;
        await UserModel.deleteUser(id);
        res.json({ success: true, message: "delete user successfull" });
    } catch (error) {
        res.status(500).json({
            message: "delete user fail",
            error,
        });
    }
};
const getUserSearchByRoleEmailUername = async (req, res) => {
    try {
        const { searchKey } = req.query;
        if (!searchKey) {
            return res.status(400).json({ message: "searchKey null" });
        }

        const decodedSearchKey = decodeURIComponent(searchKey);
        // console.log(decodedSearchKey);

        const user = await UserModel.searchUsers(decodedSearchKey);
        res.json({
            success: true,
            user: user,
            message: "find  user successfull",
        });
    } catch (error) {
        res.status(500).json({
            message: "find user fail",
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
const reloadDataUser = async (req, res) => {
    try {
        const { id } = req.body;
        const [user] = await UserModel.getUserById(id);
        res.status(200).json({
            success: true,
            message: "Lấy dữ liệu user thành công",
            user: user,
        });
    } catch (error) {
        res.status(500).json({
            message: "Lỗi khi lấy người dùng",
            error,
        });
    }
};
const getCountUserRegiterInMonth = async (req, res) => {
    try {
        const { year } = req.query;
        console.log(year);
        const count_user = await UserModel.countUserRegiterInMonth(year);
        res.status(200).json({
            success: true,
            message: "Lấy dữ liệu count user thành công",
            countuser: count_user,
        });
    } catch (error) {
        res.status(500).json({
            message: "Lỗi khi lấy người dùng",
            error,
        });
    }
};

const registerInstructor = async (req, res) => {
    try {
        const { id } = req.body; // Nhận userId từ request body
        console.log("userId: " + typeof id + "---" + id);
        // Kiểm tra xem user có tồn tại và đang là student không
        const [user] = await UserModel.getUserById(id);

        // console.warn("User Keys:", Object.keys(user));
        // console.warn("User Keys:", Object.values(user));

        if (user.length === 0 || user.role !== "student") {
            console.warn("Không phải là student");
            return;
        }

        // Cập nhật vai trò của user thành instructor
        await UserModel.updateRoleUserToInstrutor(id);

        const [userUpdate] = await UserModel.getUserById(id);

        res.status(200).json({
            success: true,
            message: "Đăng ký giảng viên thành công",
            redictUrl: "/",
            userUpdate: userUpdate,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Đăng ký giảng viên thất bại",
        });
    }
};

const updateUserImage = async (req, res) => {
    try {
        console.log("Bắt đầu xử lý cập nhật ảnh người dùng");
        const { imageBase64, userId } = req.body; // Expecting Base64 image data and userId
        
        console.log("userId nhận được:", userId);
        console.log("Độ dài chuỗi base64:", imageBase64?.length || 0);

        if (!imageBase64 || !userId) {
            console.log("Thiếu dữ liệu đầu vào:", {
                hasImageBase64: !!imageBase64,
                hasUserId: !!userId
            });
            return res.status(400).json({
                success: false,
                message: "Thiếu thông tin cần thiết để cập nhật ảnh"
            });
        }

        // Tạo tên file mới với timestamp
        const now = new Date();
        const timestamp = `${now.getFullYear()}${(now.getMonth()+1).toString().padStart(2,'0')}${now.getDate().toString().padStart(2,'0')}_${now.getHours().toString().padStart(2,'0')}${now.getMinutes().toString().padStart(2,'0')}${now.getSeconds().toString().padStart(2,'0')}`;
        const filename = `avatar_${userId}_${timestamp}.png`; // Assuming PNG format
        console.log("Tên file được tạo:", filename);

        // Lưu ảnh vào thư mục uploads sử dụng saveBase64Image
        console.log("Bắt đầu lưu ảnh...");
        const savedImagePath = saveBase64Image(imageBase64, filename, 'avartaUser');
        console.log("Đường dẫn ảnh đã lưu:", savedImagePath);

        // Lấy tên file từ đường dẫn đầy đủ
        const imageUrl = filename;

        // Cập nhật tên file vào database
        console.log("Bắt đầu cập nhật tên file trong database...");
        await UserModel.updateUserImage(imageUrl, userId);
        console.log("Cập nhật database thành công");

        res.status(200).json({
            success: true,
            message: "Cập nhật ảnh người dùng thành công",
            imageUrl: imageUrl
        });

    } catch (error) {
        console.error("Chi tiết lỗi:", error);
        console.error("Stack trace:", error.stack);
        res.status(500).json({
            success: false,
            message: "Lỗi khi cập nhật ảnh người dùng",
            error: error.message
        });
    }
};


const getUserAvatar = async (req, res) => {
    try {
        const userId = req.params.id;

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "Thiếu ID người dùng"
            });
        }

        const avatarUrl = await UserModel.getUserAvatar(userId);

        if (!avatarUrl) {
            return res.status(404).json({
                success: false, 
                message: "Không tìm thấy avatar của người dùng"
            });
        }

        res.status(200).json({
            success: true,
            avatarUrl: avatarUrl
        });

    } catch (error) {
        console.error("Lỗi khi lấy avatar người dùng:", error);
        res.status(500).json({
            success: false,
            message: "Lỗi server khi lấy avatar người dùng",
            error: error.message
        });
    }
};


module.exports = {
    getAllUsers,
    putUserRegister,
    registerInstructor,
    reloadDataUser,
    deleteUser,
    getUserSearchByRoleEmailUername,
    getCountUserRegiterInMonth,
    updateUserImage,
    getUserAvatar
};
