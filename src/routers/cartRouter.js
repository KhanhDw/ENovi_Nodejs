const express = require("express");
const cartController = require("../controllers/cartController");

const router = express.Router();

router.post("/:userId/courses", cartController.addCourseToCart);
router.delete("/:userId/courses/delete-list-course", cartController.deleteMultipleCoursesFromCart); 
router.delete("/:userId/courses/:courseId", cartController.deleteCourseInCart); 
router.get("/:userId", cartController.getListCourseInCartUserId); 
router.get("/:userId/courses/:courseId/exists", cartController.isCourseInCart);

module.exports = router;
