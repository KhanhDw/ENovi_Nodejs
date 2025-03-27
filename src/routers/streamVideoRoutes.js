const express = require('express');
const router = express.Router();
const {streamVideo} = require('../controllers/streamVideoController');

// Route để stream video
router.get('/video', streamVideo);

module.exports = router;