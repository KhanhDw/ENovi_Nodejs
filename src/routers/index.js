const express = require("express");
const userRoutes = require("./userRoutes");
const router = express.Router();

const loginRoutes = require("./loginRouter");
const authRoutes = require("./authRoutes");
const searchRoutes = require("./searchRoutes");
const forgotPasswordRouter = require("./password/forgot-password");
const resetPasswordRouter = require("./password/reset-password");
const registerRouter = require("./registerRouter");
const categoriesRouter = require("./categoryRoutes");
const courseRouter = require("./courseRoutes");
const uploadImageRouter = require("./upload/image/uploadImageRouter");
const uploadVideoRouter = require("./upload/video/uploadVideoRouter");
const languageRouter = require("./languagesRoutes");
const adminRoutes = require("./adminRoutes");
const cartRouter = require("./cartRouter");
const mylearningRouter = require("./mylearningRouter");
const enrollmentRouter = require("./enrollmentRoutes");
const paymentRoutes = require("./vnpay/paymentRoutes");

// Kết nối các router con
router.use("/search", searchRoutes);
router.use("/user", userRoutes);
router.use("/login", loginRoutes);
router.use("/register", registerRouter);    
router.use("/categories", categoriesRouter);
router.use("/course", courseRouter);
router.use("/auth", authRoutes);
router.use("/repass", resetPasswordRouter);
router.use("/fopass", forgotPasswordRouter);
router.use("/admin", adminRoutes);
router.use("/cart", cartRouter);
router.use("/my-learning", mylearningRouter);
router.use("/enrollment", enrollmentRouter);

// đặc biệt
router.use("/upload-img", uploadImageRouter);
router.use("/upload-video", uploadVideoRouter);
router.use("/languages", languageRouter);

// vnpay
router.use("/vnpay/order", paymentRoutes);

module.exports = router;
