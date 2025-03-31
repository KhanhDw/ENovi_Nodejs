const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

// Định nghĩa các route cho user
router.post("/instructor/register", userController.registerInstructor);
router.put("/update-profile", userController.updateUserProfile);
router.put("/update-image", userController.updateUserImage);
router.get("/total-users", userController.getTotalUsers); 
router.get("/total-instructors", userController.getTotalInstructors);
router.delete("/delete", userController.deleteUser);
router.get("/avatar/:id", userController.getUserAvatar);
router.get("/:id", userController.reloadDataUser); // hình như không dùng,
// router.post("/", userController.createUser); // POST /api/users
// router.get("/:id", userController.getUserById); // GET /api/users/:id
// router.put("/:id", userController.updateUser); // PUT /api/users/:id
// router.delete("/:id", userController.deleteUser); // DELETE /api/users/:id




module.exports = router;
