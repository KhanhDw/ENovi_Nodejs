const { saveBase64Image } = require("../../../services/img/saveImage");

const saveBannerCourse = async (req, res) => {
    try {
        const { imagebase64String, fileName } = req.body;
        if (!imagebase64String || !fileName) {
            return res
                .status(400)
                .json({ message: "Base64 data and file name are required" });
        }

        const filePath = saveBase64Image(imagebase64String, fileName);
        return res
            .status(200)
            .json({
                success: true,
                message: "Image saved successfully",
                filePath,
            });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    saveBannerCourse,
};
