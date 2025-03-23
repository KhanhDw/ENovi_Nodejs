require("dotenv").config();
const { google } = require("googleapis");
const fs = require("fs");
const path = require("path");

const client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    "http://localhost"
);
client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });
const youtube = google.youtube({
    version: "v3",
    auth: client,
});


const checkQuota = async () => {
    try {
        await youtube.videos.list({
            part: "snippet",
            id: "7sw4Oi_3oX4", // Một ID video  để kiểm tra quota
        });
        console.log("Quota còn đủ để tải lên.");
        return true; // Quota vẫn còn
    } catch (error) {
        if (error.response && error.response.status === 403) {
            console.error("Quota bị giới hạn! Không thể tải lên video.");
            return false; // Quota đã hết
        }
        console.error("Lỗi khi kiểm tra quota:", error);
        return false;
    }
};

/*
// ======================================
+ mỗi ngày có 10,000 điểm gọi API youtube 
+ mỗi lần gọi insert video sẽ -1,600 điểm
+ gọi cập nhật danh sách 1 điểm mổi lần
+ có thể upload nhiều video cùng lúc [video] để giảm số lần gọi API    
// ======================================
*/



const uploadYoutube = async (videoName) => {

    // Kiểm tra quota trước khi tải lên
    const quotaOK = await checkQuota();
    if (!quotaOK) {
        return null; // Dừng quá trình tải lên
    }

    const pathVideo = path.join(__dirname, "../../../uploads/video/", videoName);
    // Kiểm tra xem file có tồn tại không
    if (!fs.existsSync(pathVideo)) {
        throw new Error(`File not found: ${pathVideo}`);
    }
    try {
        const response = await youtube.videos.insert({
            part: "snippet,status",
            requestBody: {
                snippet: {
                    title: "KhanhTestDOiHoaMatTRoi",
                    description: "kiem tra video tai len",
                    tags: [],
                },
                status: {
                    privacyStatus: "private",
                    madeForKids: false,
                    selfDeclaredMadeForKids: false,
                },
            },
            media: {
                body: fs.createReadStream(pathVideo),
            },
        });

        if (!response || !response.data) {
            throw new Error("Phản hồi từ YouTube API không hợp lệ.");
        }

        const videoId = response.data.id;
        if (!videoId) {
            throw new Error("Không lấy được video ID từ phản hồi API.");
        }

        console.log("Video uploaded successfully! Video ID:", videoId);

        // Sau khi tải lên, có thể gọi hàm kiểm tra trạng thái xử lý video nếu cần
        await waitForProcessing(videoId);

        return videoId;
    } catch (error) {
        console.log("Đã xảy ra lỗi khi tải video lên youtube : ", error);
    }
};

// Hàm kiểm tra trạng thái xử lý video
const waitForProcessing = async (videoId) => {
    console.log(`Checking processing status for video ID: ${videoId}`);

    let attempts = 0;
    while (attempts < 10) { // Chỉ kiểm tra tối đa 10 lần
        await new Promise((resolve) => setTimeout(resolve, 300000)); // Chờ 5 phút (thay vì 1 phút)
        attempts++;

        try {
            const response = await youtube.videos.list({
                part: "processingDetails,status",
                id: videoId,
            });

            const video = response.data.items[0];

            if (!video) {
                console.log("Không tìm thấy video, có thể bị xóa hoặc lỗi.");
                return;
            }

            const processingStatus = video.processingDetails.processingStatus;
            const uploadStatus = video.status.uploadStatus;

            console.log(
                `Processing status: ${processingStatus}, Upload status: ${uploadStatus}`
            );

            if (processingStatus === "succeeded" && uploadStatus === "processed") {
                console.log(`Video ${videoId} đã xử lý xong!`);
                return;
            }
        } catch (error) {
            console.error("Lỗi khi kiểm tra trạng thái video:", error);
        }
    }

    console.log(`Đã kiểm tra quá số lần cho phép, dừng kiểm tra.`);
};
 

module.exports = { uploadYoutube, waitForProcessing };
