require("dotenv").config();

const express = require("express");
const passport = require("../config/passport");
const authController = require("../controllers/authController");
const userModel = require("../models/userModel");
const { generateToken } = require("./../utils/JWT");

const router = express.Router();

router.get("/", authController.homelo);
router.get("/go", authController.loginGoole);
router.get(
    "/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
    "/google/callback",
    passport.authenticate("google", {
        failureRedirect: "/auth",
    }),
    async (req, res) => {
        if (req.user !== null) {
            if (req.user) {
                try {
                    // Sử dụng await và truyền trực tiếp các trường từ req.user
                    // Lấy các trường an toàn từ req.user (xử lý undefined)
                    const googleId = req.user.id || null;
                    const name = req.user.displayName || null; // Thường dùng displayName
                    const email =
                        (req.user.emails &&
                            req.user.emails[0] &&
                            req.user.emails[0].value) ||
                        null; // Kiểm tra cẩn thận
                    const picture =
                        (req.user.photos &&
                            req.user.photos[0] &&
                            req.user.photos[0].value) ||
                        null; // Kiểm tra cẩn thận

                    try {
                        if (userModel.findUserByGoogleId(googleId) !== null) {
                            const token = generateToken(googleId);
                            const message = "login success";
                            console.log("đăng nhập thành công");
                            return res.redirect(
                                `${process.env.FONT_END_URL}/auth/callback?token=${token}&message=${message}`
                            );
                            // return res.redirect("/users/ge");
                        } else {
                            await userModel.createUserGoogle(
                                googleId,
                                name,
                                email,
                                picture
                            );
                            // return res.redirect("/users/ge");
                        }
                    } catch (error) {
                        console.error("Lỗi xử lý Google callback:", error);
                        res.status(500).json({
                            success: false,
                            message: "Lỗi xử lý đăng nhập Google.",
                        });
                    }
                    // res.redirect("/users/ge"); // Chuyển hướng đến nơi bạn muốn
                } catch (error) {
                    console.error("Error creating user:", error);
                    res.status(500).send("Lỗi google đăng nhập get thông tin");
                }
            } else {
                res.redirect("/auth/go");
            }
        }
    }
);

// Route lấy thông tin user sau khi đăng nhập
router.get("/profile", (req, res) => {
    if (!req.user) return res.redirect("/auth/google");
    console.log("Session:", req.session); // Kiểm tra session có lưu không
    console.log("User:", req.user); // Kiểm tra user có tồn tại không
    if (!req.user)
        return res.status(401).json({ message: "User not authenticated" });
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
    });
});

router.get("/logout", (req, res) => {
    // Hủy session nếu bạn đang sử dụng session
    if (req.session) {
        req.session.destroy();
    }

    // Hủy thông tin xác thực từ Passport
    req.logout((err) => {
        if (err) {
            console.error("Lỗi khi đăng xuất:", err);
            return res
                .status(500)
                .json({ success: false, message: "Lỗi khi đăng xuất" });
        }

        // Thông báo đăng xuất thành công
        res.json({ success: true, message: "Đăng xuất thành công" });
    });
});

module.exports = router;
