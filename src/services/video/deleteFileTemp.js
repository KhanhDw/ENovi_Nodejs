const fs = require("fs");
const path = require("path");

const deleteVideoTemp = (pathVideo) => {
    let pathDeleteVideo = path.join(__dirname, "./../uploads/" + pathVideo);

    try {
        // Sử dụng fs.unlink để xóa file
        fs.unlink(pathDeleteVideo, (err) => {
            if (err) {
                console.error("Lỗi khi xóa file:", err);
            } else {
                console.log("File đã được xóa thành công.");
            }
        });
    } catch (error) {
        console.log(error);
    }
};

module.exports = { deleteVideoTemp };
