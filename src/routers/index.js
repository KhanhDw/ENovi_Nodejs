const express = require("express");
const userRoutes = require("./userRoutes");
const router = express.Router();

const authRoutes = require("./authRoutes");
const searchRoutes = require("./searchRoutes");
const forgotPasswordRouter = require("./password/forgot-password");
const resetPasswordRouter = require("./password/reset-password");

// Kết nối các router con
router.use("/search", searchRoutes);
router.use("/users", userRoutes);
router.use("/auth", authRoutes);
router.use("/repass", resetPasswordRouter);
router.use("/fopass", forgotPasswordRouter);

module.exports = router;
