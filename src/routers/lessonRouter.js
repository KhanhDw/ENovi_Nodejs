const express = require("express");
const lessonController = require("../controllers/LessionController");

const router = express.Router();

router.get("/get-watch", lessonController.getLessonToWatch);
   
module.exports = router;
