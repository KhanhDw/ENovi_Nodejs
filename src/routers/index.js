const express = require("express");
const userRoutes = require("./userRoutes");
const authRoutes = require("./authRoutes");
const searchRoutes = require("./searchRoutes");

const router = express.Router();

// Kết nối các router con

router.use("/search", searchRoutes);
router.use("/users", userRoutes);
router.use("/auth", authRoutes);

module.exports = router;
