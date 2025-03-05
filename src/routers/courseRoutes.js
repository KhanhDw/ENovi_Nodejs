const express = require("express");
const courseController = require("../controllers/courseController");

const router = express.Router();

// Định nghĩa các route cho Course
router.get("/title/:title", courseController.getCourseByTitle); // GET /api/courses/title/:title
router.get("/price/:price", courseController.getCourseByPrice); // GET /api/courses/price/:price
router.get("/level/:level", courseController.getCourseByLevel); // GET /api/courses/level/:level
router.get("/instructor/:instructorName", courseController.getCourseByInstructor); // GET /api/courses/instructor/:instructorName
router.get("/category/:categoryName", courseController.getCourseByCategory); // GET /api/courses/category/:categoryName
router.get("/category/v1/:categoryName", courseController.getCourseByCategoryV1); // GET /api/courses/category/v1/:categoryName
router.get("/category/v2/:categoryName", courseController.getCourseByCategoryV2); // GET /api/courses/category/v2/:categoryName

module.exports = router;
