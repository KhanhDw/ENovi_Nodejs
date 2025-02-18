// database.js
const mysql = require("mysql2/promise");

async function connectToDatabase() {
    try {
        const connection = await mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "1234",
            database: "enovisql",
        });
        console.log("Kết nối MySQL thành công.");
        return connection;
    } catch (err) {
        console.error("Lỗi kết nối MySQL:", err);
        return null;
    }
}

module.exports = { connectToDatabase };
