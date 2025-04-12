require("dotenv").config();
const express = require("express");
const expressSesion = require("express-session");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
const path = require('path');
// const bodyParser = require("body-parser");
const routes = require("./routers/index");
const mysqlEnovi = require("./config/database");

const sessionMiddleware = require("./config/session"); // Import session middleware
const passport = require("./config/passport"); // Import Passport configuration
const crypto = require("crypto");

// const { uploadYoutube } = require("./services/video/uploadYoutube");
// const { deleteVideoTemp } = require("./services/video/deleteFileTemp");

const app = express();
const secret = crypto.randomBytes(64).toString("hex");
const getDomainFontEnd = require("./utils/domainFontEnd");

// Thêm dòng này trước các middleware khác
app.set('trust proxy', 1);

// Cấu hình view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Phục vụ file tĩnh từ thư mục public
app.use(express.static(path.join(__dirname, 'public')));

// Giới hạn tối đa 10 request trong 1 giây từ một IP
const limiter = rateLimit({
    windowMs: 1000, // 1 giây
    max: 15, // Tối đa 10 request mỗi giây
    message: { error: "Quá nhiều request, vui lòng thử lại sau." },
});

app.use(limiter); // Áp dụng middleware cho toàn bộ API
// Cho phép truy cập file trong thư mục uploads
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use(
    cors({
        origin: getDomainFontEnd, // Đổi thành domain của frontend
        credentials: true, // Quan trọng! Cho phép gửi cookie giữa frontend và backend
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], //Allowed Methods. Add the ones you use.
        allowedHeaders: ["Content-Type", "Authorization"], //Allowed Headers. Add the ones you use.
    })
);
app.use(express.json({ limit: '1mb' })); // Xử lý JSON // Xử lý JSON
app.use(express.urlencoded({limit: '1mb', extended: true })); // Xử lý form data

// Sử dụng session middleware
app.use(
    expressSesion({
        name: "connect.sid", // Tên cookie session
        secret: process.env.SESSION_SECRET, 
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24, // 1 day
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Use secure cookies in production
            sameSite: "lax", // SameSite attribute for CSRF protection
        },
    })
);
// Khởi tạo Passport
app.use(passport.initialize());
app.use(passport.session());

app.use("/", routes); // Kết nối các router

/* test connect database */
mysqlEnovi.testDatabaseConnection();

// uploadYoutube("video.mp4");
// deleteVideoTemp("video.mp4");

// Export app để sử dụng trong file khởi chạy server (server.js hoặc index.js)
module.exports = app;
