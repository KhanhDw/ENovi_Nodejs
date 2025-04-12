const fs = require("fs");
const path = require("path");

function streamVideoF(namevideo, req, res) {

    try {
        console.log("streamVideoF: ",
            "namevideo: ", namevideo,
            "req: ", req,
            "res: ", res
        );

        if (namevideo === undefined || namevideo === null) {
            console.log("namevideo is null or undefined");
            return;
        }
    } catch (error) {
        console.log("error streamVideoF: ", error);
        
    }

    try {
        const videoPath = path.join(__dirname, "../../uploads/video", namevideo);
        const stat = fs.statSync(videoPath);
        const fileSize = stat.size;
        const range = req.headers.range;

        if (range) {
            const parts = range.replace(/bytes=/, "").split("-");
            const start = parseInt(parts[0], 10);
            const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

            const chunkSize = end - start + 1;
            const file = fs.createReadStream(videoPath, { start, end });
            const head = {
                "Content-Range": `bytes ${start}-${end}/${fileSize}`,
                "Accept-Ranges": "bytes",
                "Content-Length": chunkSize,
                "Content-Type": "video/mp4",
            };

            // console.log("đang stream video name: ", namevideo);

            res.writeHead(206, head);
            file.pipe(res);
        } else {
            const head = {
                "Content-Length": fileSize,
                "Content-Type": "video/mp4",
            };
            res.writeHead(200, head);
            fs.createReadStream(videoPath).pipe(res);
        }
    } catch (error) {
        // console.log("try-catch : Error while streaming video: ", error);
        res.status(404).json({loadStreamError: true});
    }
}

module.exports = streamVideoF;
