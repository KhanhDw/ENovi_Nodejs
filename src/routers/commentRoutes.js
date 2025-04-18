const express = require("express");
const commentController = require("../controllers/commentController");

const router = express.Router();

router.post("/add", commentController.addComment);
router.delete("/delete/:commentId", commentController.deleteComment);
router.get("/course/:courseId/:userId", commentController.getCommentsByCourseId);

module.exports = router;
