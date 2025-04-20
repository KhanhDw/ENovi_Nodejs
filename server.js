require("dotenv").config();
const https = require("https");
const path = require("path");
const app = require("./src/app");
const fs = require("fs");
const port = 3000;


// Đọc SSL certificate
const options = {
    key: fs.readFileSync(path.join(__dirname, "cert", "localhost-key.pem")),
    cert: fs.readFileSync(path.join(__dirname, "cert", "localhost.pem")),
};


// Khởi động server
// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });



https.createServer(options, app).listen(port, async () => {
    console.log(`Server is running on https://localhost:${port}`);
});
