const express = require("express");
const mylearningController = require("../controllers/mylearningController");

const router = express.Router();

// Route to check if a course exists in MyLearning
router.get("/check", mylearningController.checkCourseInMyLearning);

// Route to search courses by name in MyLearning
router.get("/search", mylearningController.searchCoursesByName);

// Route to get MyLearning data by user ID  
router.get("/:userId", mylearningController.getMyLearningByUserId);

// Route to add a course to MyLearning
router.post("/add", mylearningController.addToMyLearning);

// Route to remove a course from MyLearning
router.delete("/remove", mylearningController.removeFromMyLearning);



module.exports = router;
