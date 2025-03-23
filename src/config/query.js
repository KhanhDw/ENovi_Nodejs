// query.js
const { pool } = require("./database");

async function executeQuery(sql, params = []) {
    const connection = await pool.getConnection(); // Lấy kết nối từ pool
    if (!connection) return null;

    try {
        const [rows] = await connection.execute(sql, params);
        return rows;
    } catch (err) {
        console.error("Lỗi truy vấn:", err);
        return null;
    } finally {
        connection.release(); // 🔥 Giải phóng kết nối về pool, KHÔNG dùng connection.end()
    }
}

module.exports = { executeQuery };
