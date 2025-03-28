const paymentmethodModel = require("../models/paymentmethod");

const addPaymentMethod = async (req, res) => {
    try {
        const data = req.body;
        const result = await paymentmethodModel.addPaymentMethod(data);

        return res.json({ success: true, message: "Payment method added successfully", result });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

const updatePaymentMethod = async (req, res) => {
    try {
        const user_id = req.params.user_id;
        const data = req.body;

        console.log('user_id, data:', user_id, data);
       await paymentmethodModel.updatePaymentMethod(user_id, data);

        return res.json({ success: true, message: "Payment method updated successfully", });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

const checkUserExists = async (req, res) => {
    try {
        const user_id = req.params.user_id;
        const userExists = await paymentmethodModel.isUserExists(user_id);

        if (userExists) {
            return res.json({ success: true, message: "User exists" });
        } else {
            return res.status(404).json({ success: false, message: "User not found" });
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

const getPaymentMethodByUserId = async (req, res) => {
    try {
        const user_id = req.params.user_id;
        const paymentMethod = await paymentmethodModel.getPaymentMethodByUserId(user_id);

        if (paymentMethod) {
            return res.json({ success: true, paymentMethod });
        } else {
            return res.status(404).json({ success: false, message: "Payment method not found" });
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    addPaymentMethod,
    updatePaymentMethod,
    checkUserExists,
    getPaymentMethodByUserId
};

