
const streamVideoF = require("../utils/streamvideo");


const streamVideo = (req, res) => {
    try {
        if (req.query.namevideo === undefined) {
            return res.status(404).send("Video not found.");
        }
        streamVideoF(req.query.namevideo, req, res);
    } catch (error) {
        console.error("Error streaming video:", error);
        res.status(500).send("An error occurred while streaming the video.");
    }
};




module.exports = { streamVideo };
