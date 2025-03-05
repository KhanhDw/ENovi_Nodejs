const https = require("https");
const path = require("path");
const app = require("./src/app");
const fs = require("fs");
const port = 3000;

// // Khởi động server
// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });

// Đọc SSL certificate
const options = {
    // key: fs.readFileSync(path.join(__dirname, "cert", "localhost-key.pem")), // Đường dẫn đến private key
    key: fs.readFileSync(path.join(__dirname, "cert", "private_key.pem")), // Đường dẫn đến private key
    // cert: fs.readFileSync(path.join(__dirname, "cert", "localhost.pem")), // Đường dẫn đến certificate
    cert: fs.readFileSync(path.join(__dirname, "cert", "cert.pem")), // Đường dẫn đến certificate
};

https.createServer(options, app).listen(port, () => {
    console.log(`Server is running on https://localhost:${port}`);
});
