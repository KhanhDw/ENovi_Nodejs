require("dotenv").config();

const express = require("express");
const passport = require("../config/passport");
const authController = require("../controllers/authController");
const userModel = require("../models/userModel");
const { generateToken } = require("./../utils/JWT");

const router = express.Router();

router.get("/", authController.homelo);
//------------------------------------------
router.get("/go", authController.loginGoole); //just use to test api in back end
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
        try {
            if (!req.user) {
                return res.redirect(
                    `${process.env.FONT_END_URL}/auth/callback?error=no_user`
                );
            }

            const googleId = req.user.id || null;
            const name = req.user.displayName || null;
            const email =
                (req.user.emails &&
                    req.user.emails[0] &&
                    req.user.emails[0].value) ||
                null;
            const picture =
                (req.user.photos &&
                    req.user.photos[0] &&
                    req.user.photos[0].value) ||
                null;

            let userLogin,
                token,
                message,
                isNewUser = false;

            const userLoginGoogle = await userModel.findUserByGoogleId(
                googleId
            );
            const userIdLogin = await userModel.getUserByGoogleID(googleId);

            if (userLoginGoogle) {
                userLogin = userLoginGoogle;
                token = generateToken(userIdLogin);
                message = "login success";
            } else {
                await userModel.createUserGoogle(
                    googleId,
                    name,
                    email,
                    picture
                );
                const userIdLogin = await userModel.getUserByGoogleID(googleId);
                userLogin = userIdLogin;
                token = generateToken(userIdLogin);
                message = "register success";
                isNewUser = true;
            }

            // Lưu session
            req.session.token = token;
            req.session.user = {
                id: userLogin.id,
                googleId,
                userName: userLogin.username ? userLogin.username : name,
                email,
                picture: userLogin.avatar ? userLogin.avatar : picture,
                website: userLogin.website,
                biography: userLogin.biography,
                role: userLogin.role ?? "student",
            };
            req.session.isNewUser = isNewUser;
            req.session.message = message;

            console.log("Session saved:", req.session);

            return res.redirect(`${process.env.FONT_END_URL}/auth/callback`);
        } catch (error) {
            console.error("Error in Google login process:", error);
            return res.redirect(
                `${process.env.FONT_END_URL}/auth/callback?error=auth_failed`
            );
        }
    }
);

// API để frontend lấy dữ liệu session
router.get("/api/auth/google/callback", (req, res) => {
    if (req.session.token && req.session.user) {
        const response = {
            success: true,
            token: req.session.token,
            user: req.session.user,
            message: req.session.message,
            isNewUser: req.session.isNewUser,
        };
        // Xóa session sau khi trả về
        req.session.destroy((err) => {
            if (err) console.error("Error destroying session:", err);
        });
        return res.json(response);
    } else {
        return res.json({
            success: false,
            message: "No session data found",
        });
    }
});
//------/google/data-------------------------
router.get("/google/data", (req, res) => {

    console.log('1111111111111111111111111111:', req.session.token , req.session.user);

    if (req.session.token && req.session.user) {
        const response = {
            success: true,
            message: req.session.message,
            token: req.session.token,
            user: req.session.user,
            isNewUser: req.session.isNewUser,
        };
        // console.log("Session data:", response);
        // Xóa session sau khi trả dữ liệu vì session đã gán cho response
        // Xóa session + cookie
        req.session.destroy((err) => {
            if (err)
                return res
                    .status(500)
                    .json({ error: "Error clearing session" });

            res.clearCookie("connect.sid", {
                path: "/",
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
            });

            return res.status(200).json(response);
        });
    } else {
        return res
            .status(401)
            .json({ success: false, message: "No session data" });
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
router.post("/logout", async (req, res, next) => {
    try {
        // ✅ Đăng xuất người dùng (Passport.js)
        req.logout((err) => {
            if (err) {
                console.error("Logout error:", err);
                return res.status(500).json({ message: "Logout failed" });
            }

            // ✅ Xóa session
            req.session.destroy((err) => {
                if (err) {
                    console.error("Session destruction error:", err);
                    return res
                        .status(500)
                        .json({ message: "Could not destroy session" });
                }

                // ✅ Xóa cookie session
                res.clearCookie("connect.sid", {
                    path: "/",
                    httpOnly: true,
                    secure: true, // Chỉ áp dụng nếu dùng HTTPS
                    sameSite: "strict",
                });

                return res
                    .status(200)
                    .json({ message: "Logged out successfully" });
            });
        });
    } catch (error) {
        console.error("Unexpected error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
//------------------------------------------

module.exports = router;
