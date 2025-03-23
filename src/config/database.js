// database.js
const mysql = require("mysql2/promise");

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "enovisql",
    waitForConnections: true,
    connectionLimit: 10, // Giới hạn số kết nối đồng thời
    queueLimit: 0,
});

// Kiểm tra kết nối khi khởi động app
async function testDatabaseConnection() {
    try {
        const connection = await pool.getConnection();
        console.log("✅ Kết nối MySQL thành công!");
        connection.release(); // Giải phóng kết nối về pool
    } catch (err) {
        console.error("❌ Lỗi kết nối MySQL:", err);
    }
}

// Gọi kiểm tra ngay khi app khởi động
// testDatabaseConnection();

module.exports = { pool, testDatabaseConnection };
