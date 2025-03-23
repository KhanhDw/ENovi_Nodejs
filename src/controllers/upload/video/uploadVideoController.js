const {
    saveVideoBuffer,
    saveBase64Video,
    saveVideoChunk,
} = require("../../../services/video/saveVideo");
const { uploadYoutube } = require("../../../services/video/uploadYoutube");
const path = require('path');
const saveVideoLesson = async (req, res) => {
    // console.log(req);

    try {
        let namevideo = req.file.originalname;

        const filePath = saveVideoBuffer(req.file.buffer, namevideo);

        console.log(filePath);

        // Lấy tên file có đuôi
        const fileNameWithExt = path.basename(filePath);
        console.log("Tên file có đuôi:", fileNameWithExt); // video1_20250317035933239.mp4

        console.log(fileNameWithExt);

        res.status(200).json({
            success: true,
            message: "Upload video lên hệ thống thành công",
            namevideo: namevideo,
        });

        // // Khi hoàn tất lưu file, thực hiện upload lên YouTube
        // uploadYoutube(fileNameWithExt)
        //     .then((videoId) => console.log("Video đã tải lên, ID:", videoId))
        //     .catch((err) => console.error("Lỗi khi tải lên:", err));
    } catch (error) {
        res.status(500).json({ message: "Lỗi uploadVideoController: " + error.message });
    }
};

module.exports = {
    saveVideoLesson,
};
