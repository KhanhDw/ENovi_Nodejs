const express = require("express");
const uploadVideoController = require('../../../controllers/upload/video/uploadVideoController');
const router = express.Router();
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() }); // Lưu vào memory để xử lý buffer

router.post("/lesson", upload.single('video'), uploadVideoController.saveVideoLesson); 
router.post("/intro-video", upload.single('video'), uploadVideoController.saveVideoIntroCourse); 

module.exports = router;
