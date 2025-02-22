require("dotenv").config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false, // true for 465, false for 587
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

/**
 * Gửi email khôi phục mật khẩu
 * @param {string} email - Email của người dùng
 * @param {string} resetToken - Mã token để đặt lại mật khẩu
 */

const sendResetPasswordEmail = async (email, resetToken) => {
    const resetLink = `https://localhost:4200/reset-password?token=${resetToken}&email=${email}`;

    const mailOptions = {
        from: `"Support ENovi" <${process.env.SMTP_USER}>`,
        to: email,
        subject: "Khôi phục mật khẩu",
        html: ` <p>Bạn đã yêu cầu khôi phục mật khẩu. Nhấn vào link dưới đây để đặt lại mật khẩu:</p>
                <br/>
                <p>Đường dẫn chỉ có hiệu lực 10 phút!</p>
                <br/>
                <a href="${resetLink}">${resetLink}</a>
                <br/>
                <p>Nếu bạn không yêu cầu, vui lòng thay đổi mật khẩu email này. Vì bạn đang có nguy cơ bị tấn công!</p>`,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("Email đã được gửi thành công!");
    } catch (error) {
        console.error("Lỗi gửi email:", error);
    }
};

module.exports = sendResetPasswordEmail;
