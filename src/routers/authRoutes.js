require("dotenv").config();

const express = require("express");
const passport = require("../config/passport");
const { OAuth2Client } = require("google-auth-library");
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

                        if (userLoginGoogle !== null) {
                            const token = generateToken(userIdLogin);
                            const message = "login success";

                            // LƯU ACCESS TOKEN VÀ REFRESH TOKEN VÀO SESSION
                            req.session.accessToken = req.user.accessToken; // LƯU Ý: req.user ở ĐÂY
                            if (req.user.refreshToken) {
                                req.session.refreshToken =
                                    req.user.refreshToken;
                            }

                            return res.redirect(
                                `${process.env.FONT_END_URL}/auth/callback?token=${token}&message=${message}`
                            );
                        } else {
                            await userModel.createUserGoogle(
                                googleId,
                                name,
                                email,
                                picture
                            );

                            const userIdLogin =
                                await userModel.getUserByGoogleID(googleId);

                            const token = generateToken(userIdLogin);
                            const message = "register success";

                            req.session.accessToken = req.user.accessToken;
                            if (req.user.refreshToken) {
                                req.session.refreshToken =
                                    req.user.refreshToken;
                            }

                            if (req.user.refreshToken) {
                                // Kiểm tra xem refreshToken có tồn tại không
                                req.session.refreshToken =
                                    req.user.refreshToken;
                            }

                            return res.redirect(
                                `${process.env.FONT_END_URL}/auth/callback?token=${token}&message=${message}`
                            );
                        }
                    } catch (error) {
                        res.status(500).json({
                            success: false,
                            message: "Lỗi xử lý đăng nhập Google.",
                        });
                    }
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

module.exports = router;
