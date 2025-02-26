const express = require("express");
const loginController = require("../controllers/loginController");

const router = express.Router();

// Định nghĩa các route cho user
router.post("/", loginController.getUsersLogin); // GET /api/users
// router.post("/", userController.createUser); // POST /api/users
// router.get("/:id", userController.getUserById); // GET /api/users/:id
// router.put("/:id", userController.updateUser); // PUT /api/users/:id
// router.delete("/:id", userController.deleteUser); // DELETE /api/users/:id

module.exports = router;
