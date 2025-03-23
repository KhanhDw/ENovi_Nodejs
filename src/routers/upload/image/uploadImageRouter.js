const express = require("express");
const uploadImageController = require('../../../controllers/upload/image/uploadImageController');
const router = express.Router();

router.post("/banner-course", uploadImageController.saveBannerCourse); 

module.exports = router;
