const commentModel = require("../models/commentModel");


const addComment = async (req, res) => {
    const { userId, courseId, content } = req.body;
    try {
        const result = await commentModel.addComment(userId, courseId, content);
        return res.json({ success: true, message: "Comment added successfully", result });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

const deleteComment = async (req, res) => {
    const { commentId } = req.params;
    try {
        const result = await commentModel.deleteComment(commentId);
        return res.json({ success: true, message: "Comment deleted successfully", result });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

const getCommentsByCourseId = async (req, res) => {
    const { userId, courseId } = req.params;
    try {
        const comments = await commentModel.getCommentsAndRatingByCourseId(courseId);
        return res.json({ success: true, comments });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};


module.exports = {
    addComment,
    deleteComment,getCommentsByCourseId
};
