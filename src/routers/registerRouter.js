const express = require("express");
const registerController = require("../controllers/registerController");

const router = express.Router();

// Định nghĩa các route cho user
router.post("/", registerController.RegisterUser); // GET /api/users
// router.post("/", userController.createUser); // POST /api/users
// router.get("/:id", userController.getUserById); // GET /api/users/:id
// router.put("/:id", userController.updateUser); // PUT /api/users/:id
// router.delete("/:id", userController.deleteUser); // DELETE /api/users/:id

module.exports = router;
