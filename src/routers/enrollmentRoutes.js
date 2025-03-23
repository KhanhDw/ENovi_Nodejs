const express = require("express");
const enrollmentController = require("../controllers/enrollmentController");

const router = express.Router();

router.post("/add", enrollmentController.addEnrollment);
   
module.exports = router;
