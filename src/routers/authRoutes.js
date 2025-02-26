require("dotenv").config();

const express = require("express");
const passport = require("../config/passport");
const authController = require("../controllers/authController");
const userModel = require("../models/userModel");
const { generateToken } = require("./../utils/JWT");

const router = express.Router();

router.get("/", authController.homelo);
//------------------------------------------
router.get("/go", authController.loginGoole);
//------/google------------------------------
router.get(
    "/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);
//------/google/callback-------------------------
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
                    const name = req.user.displayName || null;
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
                        const userLoginGoogle =
                            await userModel.findUserByGoogleId(googleId);
                        const userIdLogin = await userModel.getUserByGoogleID(
                            googleId
                        );
                        let token,
                            message,
                            isNewUser = false;


                            console.log("userLoginGoogle", userIdLogin);

                        if (userLoginGoogle) {
                            token = generateToken(userIdLogin);
                            message = "login success";

                            // return res.redirect(
                            //     `${process.env.FONT_END_URL}/auth/callback?token=${token}&message=${message}`
                            // );
                        } else {
                            // tạo người dùng mới
                            await userModel.createUserGoogle(
                                googleId,
                                name,
                                email,
                                picture
                            );

                            const userIdLogin =
                                await userModel.getUserByGoogleID(googleId);

                            token = generateToken(userIdLogin);
                            message = "register success";

                            // return res.redirect(
                            //     `${process.env.FONT_END_URL}/auth/callback?token=${token}&message=${message}`
                            // );
                        }

                        // Lưu token vào session nếu cần
                        req.session.accessToken = req.user.accessToken;
                        if (req.user.refreshToken) {
                            req.session.refreshToken = req.user.refreshToken;
                        }

                        // Trả về response JSON cho frontend
                        // Lưu token vào session
                        req.session.token = token;
                        req.session.user = {
                            id: userIdLogin[0].id,
                            googleId,
                            name,
                            email,
                            picture,
                            role:userLoginGoogle.role ?? "student" // Gán "student" nếu role là undefined/null
                        };
                        req.session.isNewUser = isNewUser;
                        req.session.message = message;
                        // Redirect về frontend mà không cần dữ liệu trong query
                        return res.redirect(
                            `${process.env.FONT_END_URL}/auth/callback`
                        );
                    } catch (error) {
                        console.error("Error in Google login process:", error);
                        // return res.status(500).json({
                        //     success: false,
                        //     message: "Lỗi xử lý đăng nhập Google",
                        //     error: error.message,
                        // });
                        return res.redirect(`${process.env.FONT_END_URL}/auth/callback?error=auth_failed`);
                    }
                } catch (error) {
                    console.error("Error processing user data:", error);
                    return res.status(500).json({
                        success: false,
                        message: "Lỗi xử lý thông tin người dùng",
                        error: error.message,
                    });
                }
            } else {
                return res.status(401).json({
                    success: false,
                    message: "Không tìm thấy thông tin người dùng",
                });
            }
        }
    }
);
//------/google/data-------------------------
router.get('/google/data', (req, res) => {
    if (req.session.token) {
        const response = {
            success: true,
            message: req.session.message,
            token: req.session.token,
            user: req.session.user,
            isNewUser: req.session.isNewUser
        };
        console.log("Session data:", response);
        // Xóa session sau khi trả dữ liệu (tùy chọn)
        req.session.destroy();
        return res.status(200).json(response);
    } else {
        return res.status(401).json({ success: false, message: 'No session data' });
    }
});
// ----/profile--------------------------------
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
//------------------------------------------
router.get("/logout", async (req, res) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.session.destroy((err) => {
            if (err) {
                return next(err);
            }
            res.clearCookie("connect.sid", {
                path: "/",
                httpOnly: true,
                secure: true,
            });
            res.redirect("/users/ge");
        });
    });
});
//------------------------------------------

module.exports = router;
