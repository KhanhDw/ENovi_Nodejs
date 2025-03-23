// src/services/videoService.js
const fs = require('fs');
const path = require('path');

/**
 * Lưu video từ buffer (dữ liệu nhị phân) vào thư mục uploads/videos
 * @param {Buffer} buffer - Dữ liệu nhị phân của video
 * @param {string} fileName - Tên file (có đuôi mở rộng, ví dụ: video.mp4)
 * @returns {string} Đường dẫn file đã lưu
 */
function saveVideoBuffer(buffer, fileName) {
  if (!buffer) throw new Error('Buffer is required');

  const uploadDir = path.join(__dirname, '../../../uploads/video');
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const timestamp = new Date().toISOString().replace(/[-T:.Z]/g, "");
  const ext = path.extname(fileName);
  const baseName = path.basename(fileName, ext);
  const uniqueFileName = `${baseName}_${timestamp}${ext}`;

  const filePath = path.join(uploadDir, uniqueFileName);
  fs.writeFileSync(filePath, buffer);

  console.log('Saved video at:', filePath);
  return filePath;
}

/**
 * Lưu video từ Base64 (nếu vẫn muốn dùng Base64)
 * @param {string} base64Data - Chuỗi Base64 (đã lọc header)
 * @param {string} fileName - Tên file
 * @returns {string} Đường dẫn file
 */
function saveBase64Video(base64Data, fileName) {
  if (!base64Data) throw new Error('Base64 data is required');

  const buffer = Buffer.from(base64Data, 'base64');
  return saveVideoBuffer(buffer, fileName);
}

/**
 * Lưu chunk video và ghép khi đủ
 * @param {Buffer} chunkBuffer - Buffer của chunk
 * @param {string} fileName - Tên file
 * @param {number} part - Thứ tự chunk
 * @param {number} totalParts - Tổng số chunk
 * @returns {Promise<string>} Đường dẫn file hoàn chỉnh hoặc chunk tạm
 */
async function saveVideoChunk(chunkBuffer, fileName, part, totalParts) {
  const uploadDir = path.join(__dirname, '../../uploads/videos');
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const chunkPath = path.join(uploadDir, `${fileName}.part${part}`);
  fs.writeFileSync(chunkPath, chunkBuffer);

  if (parseInt(part) + 1 === parseInt(totalParts)) {
    const finalPath = path.join(uploadDir, fileName);
    const writeStream = fs.createWriteStream(finalPath);

    for (let i = 0; i < totalParts; i++) {
      const chunkFile = path.join(uploadDir, `${fileName}.part${i}`);
      await new Promise((resolve) => {
        fs.createReadStream(chunkFile)
          .pipe(writeStream, { end: false })
          .on('finish', resolve);
      });
      fs.unlinkSync(chunkFile); // Xóa chunk sau khi ghép
    }

    writeStream.end();
    return finalPath;
  }

  return chunkPath;
}

module.exports = { saveVideoBuffer, saveBase64Video, saveVideoChunk };