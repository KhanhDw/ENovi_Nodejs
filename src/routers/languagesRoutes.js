const express = require("express");
const languageController = require("../controllers/languagesController");

const router = express.Router();

router.get("/", languageController.getLanguages);
   
module.exports = router;
