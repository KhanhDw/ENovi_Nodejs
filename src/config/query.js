// query.js
const { connectToDatabase } = require("./database");

async function executeQuery(sql, params = []) {
    const connection = await connectToDatabase();
    if (connection) {
        try {
            const [rows, fields] = await connection.execute(sql, params);
            connection.end();
            return rows;
        } catch (err) {
            console.error("Lỗi truy vấn:", err);
            connection.end();
            return null;
        }
    }
    return null;
}

module.exports = { executeQuery };
