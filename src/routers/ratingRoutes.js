const express = require("express");
const ratingController = require("../controllers/ratingController");

const router = express.Router();

router.post("/add", ratingController.addRating);
router.get("/total/:courseId", ratingController.getTotalRatings);
router.get("/breakdown/:courseId", ratingController.getRatingsBreakdown);
module.exports = router;
