const express = require("express");
const searchController = require("../controllers/searchController");

const router = express.Router();

router.get("/course", searchController.searchCoursesByTitle);

module.exports = router;
