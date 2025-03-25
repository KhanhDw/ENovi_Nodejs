// Logic xử lý thanh toán vnpay

const moment = require("moment");
const axios = require("axios");
const vnpayConfig = require("../../config/vnpay.config");
const crypto = require("crypto");
const querystring = require("qs");
const mylearningModel = require("../../models/mylearningModel");

const mylearning = new mylearningModel();


const orderController = {
    // Hiển thị danh sách đơn hàng
    getOrderList: (req, res) => {
        res.render("orderlist", { title: "Danh sách đơn hàng" });
    },

    // Hiển thị form tạo đơn hàng mới
    getCreatePayment: (req, res) => {
        res.render("order", { title: "Tạo mới đơn hàng", amount: 10000 });
    },

    // Hiển thị form truy vấn kết quả thanh toán
    getQueryDR: (req, res) => {
        res.render("querydr", { title: "Truy vấn kết quả thanh toán" });
    },

    // Hiển thị form hoàn tiền
    getRefund: (req, res) => {
        res.render("refund", { title: "Hoàn tiền giao dịch thanh toán" });
    },

    // Xử lý tạo URL thanh toán
    createPaymentUrl: (req, res) => {
        process.env.TZ = "Asia/Ho_Chi_Minh";

        let date = new Date();
        let createDate = moment(date).format("YYYYMMDDHHmmss");

        let ipAddr =
            req.headers["x-forwarded-for"] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            req.connection.socket.remoteAddress;

        console.log("ipAddr:", ipAddr);

        let tmnCode = vnpayConfig.vnp_TmnCode;
        let secretKey = vnpayConfig.vnp_HashSecret;
        let vnpUrl = vnpayConfig.vnp_Url;
        let returnUrl = vnpayConfig.vnp_ReturnUrl;
        let orderId = moment(date).format("DDHHmmss");

        // Extract orderData and listCourse from the request body
        const { orderData, listCourse, userId } = req.body;

        let amount = orderData.amount;
        let bankCode = orderData.bankCode;

        let locale = orderData.language;
        if (locale === null || locale === "") {
            locale = "vn";
        }
        let currCode = "VND";

        let vnp_Params = {};
        vnp_Params["vnp_Version"] = "2.1.0";
        vnp_Params["vnp_Command"] = "pay";
        vnp_Params["vnp_TmnCode"] = tmnCode;
        vnp_Params["vnp_Locale"] = locale;
        vnp_Params["vnp_CurrCode"] = currCode;
        vnp_Params["vnp_TxnRef"] = orderId;
        vnp_Params[
            "vnp_OrderInfo"
        ] = `Thanh toan cho ma GD:${orderId}, Courses: ${listCourse.join(
            "|"
        )}, userId: ${userId}`;
        vnp_Params["vnp_OrderType"] = "other";
        vnp_Params["vnp_Amount"] = amount * 100;
        vnp_Params["vnp_ReturnUrl"] = returnUrl;
        vnp_Params["vnp_IpAddr"] = ipAddr;
        vnp_Params["vnp_CreateDate"] = createDate;
        if (bankCode !== null && bankCode !== "") {
            vnp_Params["vnp_BankCode"] = bankCode;
        }

        vnp_Params = sortObject(vnp_Params);

        let signData = querystring.stringify(vnp_Params, { encode: false });
        let hmac = crypto.createHmac("sha512", secretKey);
        let signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");
        vnp_Params["vnp_SecureHash"] = signed;
        vnpUrl += "?" + querystring.stringify(vnp_Params, { encode: false });
        console.warn("signData;", signData);
        console.warn("signed:", signed);

        // res.redirect(vnpUrl);
        res.status(200).json({ urlvnpay: vnpUrl });
    },

    // Xử lý kết quả trả về từ VNPay
    vnpayReturn: async (req, res) => {
        let vnp_Params = req.query;
        let secureHash = vnp_Params["vnp_SecureHash"];

        console.log("vnp_Params.vnp_OrderInfo:", vnp_Params.vnp_OrderInfo);
        const [courses, userId] = extractDataCourseIdAndUserId(
            vnp_Params.vnp_OrderInfo
        );
        console.warn(courses, userId);

        delete vnp_Params["vnp_SecureHash"];
        delete vnp_Params["vnp_SecureHashType"];

        vnp_Params = sortObject(vnp_Params);

        let tmnCode = vnpayConfig.vnp_TmnCode;
        let secretKey = vnpayConfig.vnp_HashSecret;

        let signData = querystring.stringify(vnp_Params, { encode: false });
        let hmac = crypto.createHmac("sha512", secretKey);
        let signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");

        if (secureHash === signed) {
            if (vnp_Params["vnp_ResponseCode"] === "00") {
                try {
                    await mylearning.addToMyLearning(userId, courses[0]);
                    return res.redirect(
                        `${process.env.FONT_END_URL}/payment/success?status=success&orderId=${vnp_Params.vnp_TxnRef}`
                    );
                    
                } catch (error) {
                    console.error("Error adding to MyLearning1:", error);
                }
                return res.redirect(
                    `${process.env.FONT_END_URL}/payment/failed?status=failed&orderId=${vnp_Params.vnp_TxnRef}&reason=internal_error`
                );
            } else {
                return res.redirect(
                    `${process.env.FONT_END_URL}/payment/failed?status=failed&orderId=${vnp_Params.vnp_TxnRef}&reason=${vnp_Params.vnp_ResponseCode}`
                );
            }
        } else {
            // res.render('success', {code: '97'});
            return res.redirect(
                `${process.env.FONT_END_URL}/payment/failed?status=failed&orderId=${vnp_Params.vnp_TxnRef}`
            );
            // res.status(500).json({success: false, message: 'Thanh toán thất bại'});
        }
    },

    // Xử lý IPN từ VNPay
    vnpayIPN: (req, res) => {
        let vnp_Params = req.query;
        let secureHash = vnp_Params["vnp_SecureHash"];

        let orderId = vnp_Params["vnp_TxnRef"];
        let rspCode = vnp_Params["vnp_ResponseCode"];

        delete vnp_Params["vnp_SecureHash"];
        delete vnp_Params["vnp_SecureHashType"];

        vnp_Params = sortObject(vnp_Params);
        let secretKey = vnpayConfig.vnp_HashSecret;
        let signData = querystring.stringify(vnp_Params, { encode: false });
        let hmac = crypto.createHmac("sha512", secretKey);
        let signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");

        let paymentStatus = "0";
        let checkOrderId = true;
        let checkAmount = true;

        if (secureHash === signed) {
            if (checkOrderId) {
                if (checkAmount) {
                    if (paymentStatus == "0") {
                        if (rspCode == "00") {
                            res.status(200).json({
                                RspCode: "00",
                                Message: "Success",
                            });
                        } else {
                            res.status(200).json({
                                RspCode: "00",
                                Message: "Success",
                            });
                        }
                    } else {
                        res.status(200).json({
                            RspCode: "02",
                            Message:
                                "This order has been updated to the payment status",
                        });
                    }
                } else {
                    res.status(200).json({
                        RspCode: "04",
                        Message: "Amount invalid",
                    });
                }
            } else {
                res.status(200).json({
                    RspCode: "01",
                    Message: "Order not found",
                });
            }
        } else {
            res.status(200).json({ RspCode: "97", Message: "Checksum failed" });
        }
    },

    // Xử lý truy vấn kết quả thanh toán
    queryDR: async (req, res) => {
        process.env.TZ = "Asia/Ho_Chi_Minh";
        let date = new Date();

        let vnp_TmnCode = vnpayConfig.vnp_TmnCode;
        let secretKey = vnpayConfig.vnp_HashSecret;
        let vnp_Api = vnpayConfig.vnp_Api;

        let vnp_TxnRef = req.body.orderId;
        let vnp_TransactionDate = req.body.transDate;

        let vnp_RequestId = moment(date).format("HHmmss");
        let vnp_Version = "2.1.0";
        let vnp_Command = "querydr";
        let vnp_OrderInfo = "Truy van GD ma:" + vnp_TxnRef;

        let vnp_IpAddr =
            req.headers["x-forwarded-for"] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            req.connection.socket.remoteAddress;

        let currCode = "VND";
        let vnp_CreateDate = moment(date).format("YYYYMMDDHHmmss");

        let data =
            vnp_RequestId +
            "|" +
            vnp_Version +
            "|" +
            vnp_Command +
            "|" +
            vnp_TmnCode +
            "|" +
            vnp_TxnRef +
            "|" +
            vnp_TransactionDate +
            "|" +
            vnp_CreateDate +
            "|" +
            vnp_IpAddr +
            "|" +
            vnp_OrderInfo;

        let hmac = crypto.createHmac("sha512", secretKey);
        let vnp_SecureHash = hmac
            .update(new Buffer(data, "utf-8"))
            .digest("hex");

        let dataObj = {
            vnp_RequestId: vnp_RequestId,
            vnp_Version: vnp_Version,
            vnp_Command: vnp_Command,
            vnp_TmnCode: vnp_TmnCode,
            vnp_TxnRef: vnp_TxnRef,
            vnp_OrderInfo: vnp_OrderInfo,
            vnp_TransactionDate: vnp_TransactionDate,
            vnp_CreateDate: vnp_CreateDate,
            vnp_IpAddr: vnp_IpAddr,
            vnp_SecureHash: vnp_SecureHash,
        };

        try {
            const response = await axios.post(vnp_Api, dataObj);
            console.log(response);
        } catch (error) {
            console.error("Error:", error);
        }
    },

    // Xử lý hoàn tiền
    refund: async (req, res) => {
        process.env.TZ = "Asia/Ho_Chi_Minh";
        let date = new Date();

        let vnp_TmnCode = vnpayConfig.vnp_TmnCode;
        let secretKey = vnpayConfig.vnp_HashSecret;
        let vnp_Api = vnpayConfig.vnp_Api;

        let vnp_TxnRef = req.body.orderId;
        let vnp_TransactionDate = req.body.transDate;
        let vnp_Amount = req.body.amount * 100;
        let vnp_TransactionType = req.body.transType;
        let vnp_CreateBy = req.body.user;

        let currCode = "VND";

        let vnp_RequestId = moment(date).format("HHmmss");
        let vnp_Version = "2.1.0";
        let vnp_Command = "refund";
        let vnp_OrderInfo = "Hoan tien GD ma:" + vnp_TxnRef;

        let vnp_IpAddr =
            req.headers["x-forwarded-for"] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            req.connection.socket.remoteAddress;

        let vnp_CreateDate = moment(date).format("YYYYMMDDHHmmss");
        let vnp_TransactionNo = "0";

        let data =
            vnp_RequestId +
            "|" +
            vnp_Version +
            "|" +
            vnp_Command +
            "|" +
            vnp_TmnCode +
            "|" +
            vnp_TransactionType +
            "|" +
            vnp_TxnRef +
            "|" +
            vnp_Amount +
            "|" +
            vnp_TransactionNo +
            "|" +
            vnp_TransactionDate +
            "|" +
            vnp_CreateBy +
            "|" +
            vnp_CreateDate +
            "|" +
            vnp_IpAddr +
            "|" +
            vnp_OrderInfo;
        let hmac = crypto.createHmac("sha512", secretKey);
        let vnp_SecureHash = hmac
            .update(new Buffer(data, "utf-8"))
            .digest("hex");

        let dataObj = {
            vnp_RequestId: vnp_RequestId,
            vnp_Version: vnp_Version,
            vnp_Command: vnp_Command,
            vnp_TmnCode: vnp_TmnCode,
            vnp_TransactionType: vnp_TransactionType,
            vnp_TxnRef: vnp_TxnRef,
            vnp_Amount: vnp_Amount,
            vnp_TransactionNo: vnp_TransactionNo,
            vnp_CreateBy: vnp_CreateBy,
            vnp_OrderInfo: vnp_OrderInfo,
            vnp_TransactionDate: vnp_TransactionDate,
            vnp_CreateDate: vnp_CreateDate,
            vnp_IpAddr: vnp_IpAddr,
            vnp_SecureHash: vnp_SecureHash,
        };

        try {
            const response = await axios.post(vnp_Api, dataObj);
            console.log(response);
        } catch (error) {
            console.error("Error:", error);
        }
    },
};

// Hàm sắp xếp object theo key
function sortObject(obj) {
    var sorted = {};
    var str = [];
    var key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            str.push(encodeURIComponent(key));
        }
    }
    str.sort();
    for (key = 0; key < str.length; key++) {
        sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(
            /%20/g,
            "+"
        );
    }
    return sorted;
}

function extractDataCourseIdAndUserId(str) {
    const regex = /Courses:\s*([\d|]+),\s*userId:\s*(\d+)/;
    const match = str.match(regex);

    if (match) {
        const courses = match[1].split("|").map(Number); // Luôn trả về mảng số
        const userId = parseInt(match[2], 10);

        return [courses, userId]; // Trả về hai biến dưới dạng mảng
    } else {
        return [[], null]; // Trả về mảng rỗng và null nếu không tìm thấy dữ liệu
    }
}

module.exports = orderController;
