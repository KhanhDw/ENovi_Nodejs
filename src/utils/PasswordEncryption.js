const crypto = require("crypto");

// password: mật khẩu cần mã hóa
// salt: một giá trị ngẫu nhiên được sử dụng để tạo ra khóa mật khẩu
// 10: số lần lặp lại của thuật toán mã hóa
// 64: độ dài của khóa mật khẩu
// 'sha512': thuật toán mã hóa được sử dụng (trong trường hợp này là SHA-512)

function Encryption(password) {
    const salt = crypto.randomBytes(16).toString("hex");
    const key = crypto.pbkdf2Sync(password, salt, 10, 64, "sha512");
    return key.toString("hex");
}

module.exports = Encryption;
