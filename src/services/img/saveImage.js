const fs = require("fs");
const path = require("path");

/**
 * Lưu ảnh từ Base64 vào thư mục uploads.
 * @param {string} base64Data - Chuỗi Base64 (đã được lọc, không có header).
 * @param {string} fileName - Tên file (có đuôi mở rộng).
 * @returns {string} Đường dẫn file đã lưu.
 */
function saveBase64Image(base64Data, fileName, folderPath) {
    if (!base64Data) {
        throw new Error("Base64 data is required");
    }

    // Giải mã Base64 thành Buffer
    const buffer = Buffer.from(base64Data, "base64");

    // Đường dẫn thư mục lưu ảnh
    const uploadDir = path.join(
        __dirname,
        "..",  // Lùi 1 cấp từ thư mục img
        "..",  // Lùi 1 cấp từ thư mục services     
        "..",  // Lùi 1 cấp từ thư mục src
        "uploads",
        "img",
        folderPath || "bannerCourses" // Sử dụng folderPath nếu được truyền vào, nếu không thì dùng "bannerCourses"
    );

    // Chuẩn hóa đường dẫn để tránh lỗi trên các hệ điều hành khác nhau
    const normalizedUploadDir = path.normalize(uploadDir);

    if (!fs.existsSync(normalizedUploadDir)) {
        fs.mkdirSync(normalizedUploadDir, { recursive: true }); // Tạo thư mục nếu chưa có
    }

    // Đường dẫn file ảnh
    const filePath = path.join(normalizedUploadDir, fileName);

    console.log("Đường dẫn thư mục:", normalizedUploadDir);
    console.log("Đường dẫn file:", filePath);

    // Lưu buffer vào file ảnh
    fs.writeFileSync(filePath, buffer);

    return filePath;
}

module.exports = { saveBase64Image };
