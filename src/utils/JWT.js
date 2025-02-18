const jwt = require("jsonwebtoken");

function generateToken(userId) {
    return jwt.sign({ userId }, "your-secret-key", { expiresIn: "1h" });
}

module.exports = {
    generateToken,
};
