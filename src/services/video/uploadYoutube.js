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

const uploadYoutube = async (videoName) => {
    let pathVideo = "./../uploads/" + videoName;
    try {
        const video = youtube.videos.insert(
            {
                part: "snippet, status",
                resource: {
                    snippet: {
                        title: "KhanhTestDOiHoaMatTRoi",
                        description: "kiem tra video tai len",
                        tag: "",
                    },
                    status: {
                        privacyStatus: "private", //privata, Unlisted
                        //nội dung không dành cho trẻ em
                        madeForKids: "false",
                        selfDeclaredMadeForKids: "false",
                    },
                },
                media: {
                    body: fs.createReadStream(path.join(__dirname, pathVideo)),
                },
            },
            (err) => {
                if (err) {
                    throw new Error(err);
                }

                console.log("video upload successfully");
            }
        );
        console.log("video upload successfully");
    } catch (error) {
        console.log("Error occured while upload video: ", error);
    }
};

module.exports = { uploadYoutube };
