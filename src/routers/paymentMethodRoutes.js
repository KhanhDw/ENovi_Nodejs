const express = require("express");
const payment_methodController = require("../controllers/payment_methodController");

const router = express.Router();

router.post("/add", payment_methodController.addPaymentMethod);
router.put("/update/:user_id", payment_methodController.updatePaymentMethod);
router.get("/get/:user_id", payment_methodController.getPaymentMethodByUserId);
router.get("/check-user/:user_id", payment_methodController.checkUserExists);
module.exports = router;
