require("dotenv").config();
const express = require("express");
const expressSesion = require("express-session");
const cors = require("cors");
// const bodyParser = require("body-parser");
const routes = require("./routers/index");
const mysqlEnovi = require("./config/database");

const sessionMiddleware = require("./config/session"); // Import session middleware
const passport = require("./config/passport"); // Import Passport configuration

const { uploadYoutube } = require("./services/video/uploadYoutube");
const { deleteVideoTemp } = require("./services/video/deleteFileTemp");

const app = express();

// Middleware
const getDomainFontEnd = require("./utils/domainFontEnd");
app.use(
    cors({
        origin: getDomainFontEnd, // Đổi thành domain của frontend
        credentials: true, // Quan trọng! Cho phép gửi cookie giữa frontend và backend
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], //Allowed Methods. Add the ones you use.
        allowedHeaders: ["Content-Type", "Authorization"], //Allowed Headers. Add the ones you use.
    })
);
app.use(express.json());

// Sử dụng session middleware
app.use(
    expressSesion({
        secret: "cats",
        resave: false,
        saveUninitialized: true,
        cookie: { secure: true }, // Nếu dùng HTTPS thì đặt secure: true
    })
);
// Khởi tạo Passport
app.use(passport.initialize());
app.use(passport.session());

app.use("/", routes); // Kết nối các router

mysqlEnovi.connectToDatabase();

// uploadYoutube("video.mp4");
// deleteVideoTemp("video.mp4");

// Export app để sử dụng trong file khởi chạy server (server.js hoặc index.js)
module.exports = app;
