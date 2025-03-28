const express = require("express");
const bankController = require("../controllers/bankController");

const router = express.Router();

router.get("/", bankController.getAllBanks);


module.exports = router;
