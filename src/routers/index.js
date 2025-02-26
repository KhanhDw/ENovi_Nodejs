const express = require("express");
const userRoutes = require("./userRoutes");
const router = express.Router();

const loginRoutes = require("./loginRouter");
const authRoutes = require("./authRoutes");
const searchRoutes = require("./searchRoutes");
const forgotPasswordRouter = require("./password/forgot-password");
const resetPasswordRouter = require("./password/reset-password");
const registerRouter = require("./registerRouter");
const categoriesRouter = require("./categoryRoutes")


// Kết nối các router con
router.use("/search", searchRoutes);
router.use("/users", userRoutes);

router.use("/login", loginRoutes);
router.use("/register", registerRouter);

router.use("/categories", categoriesRouter);

router.use("/auth", authRoutes);
router.use("/repass", resetPasswordRouter);
router.use("/fopass", forgotPasswordRouter);

module.exports = router;
