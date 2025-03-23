const express = require("express");
const adminController = require("../controllers/adminController");
const userController = require("../controllers/userController");
const categoryController = require("../controllers/categoryController");
const courseController = require('../controllers/courseController');

const router = express.Router();

router.post("/category/v0/new", categoryController.createCategories);
router.post("/category/v1/new", categoryController.createCategoriesv1);
router.post("/category/v2/new", categoryController.createCategoriesv2);

router.delete("/category/v0/delete", categoryController.deleteCategories);
router.delete("/category/v1/delete", categoryController.deleteCategoriesv1);
router.delete("/category/v2/delete", categoryController.deleteCategoriesv2);

router.get("/user/get-all-user", adminController.getAllUsers);
router.get("/user/search", userController.getUserSearchByRoleEmailUername);
router.get("/user/count-user-year", userController.getCountUserRegiterInMonth);

router.get("/course/get-all-course", courseController.getAllCourse);
router.get("/course/get-name-instructor", courseController.getInstructorName);
router.get("/course/get-course-title", courseController.getCourseByTitleLike);

// router.post("/", userController.createUser); // POST /api/users
// router.get("/:id", userController.getUserById); // GET /api/users/:id
// router.put("/:id", userController.updateUser); // PUT /api/users/:id
// router.delete("/:id", userController.deleteUser); // DELETE /api/users/:id

module.exports = router;
