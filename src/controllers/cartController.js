const cartModel = require("../models/cartModel");


const getListCourseInCartUserId = async (req, res) => {
    try {
        const {userId} = req.params;
        if (!userId) res.status(400).json({message: 'thieeys duw leieuj'});
        const getlistCourseInCart = await cartModel.getListCourseInCartUserId(userId);

        console.log("danh sach khoa hoc trong cart:"+getlistCourseInCart);

        return res.status(200).json({success: true, listCourse: getlistCourseInCart})   
    } catch (error) {
        return res.status(500).json({success: false, message: error})
    }
};
const deleteCourseInCart = async (req, res) => {
    try {
        const { userId, courseId } = req.params;
        if (!userId || !courseId) {
            return res.status(400).json({ message: 'Missing userId or courseId' });
        }
        const result = await cartModel.deleteCourseFromCart(userId, courseId);

        if (result) {
            return res.status(200).json({ success: true, message: 'Course removed from cart successfully' });
        } else {
            return res.status(404).json({ success: false, message: 'Course not found in cart' });
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

const deleteMultipleCoursesFromCart = async (req, res) => {
    try {
        const { userId } = req.params;
        const courseIds = req.query.courseIds
            ?.replace(/^\[|\]$/g, '') // Remove '[' and ']' if they exist
            .split(',')
            .map(id => id.trim());

        if (!userId || !Array.isArray(courseIds) || courseIds.length === 0) {
            return res.status(400).json({ message: 'Missing userId or courseIds' });
        }

        const result = await cartModel.deleteMultipleCoursesFromCart(userId, courseIds);

        if (result.affectedRows === courseIds.length) {
            return res.status(200).json({ success: true, message: 'All courses removed from cart successfully' });
        } else if (result.affectedRows > 0) {
            return res.status(207).json({
                success: true,
                message: 'Some courses could not be removed from cart',
                failedCourses: courseIds.slice(result.affectedRows)
            });
        } else {
            return res.status(404).json({ success: false, message: 'No courses found to remove from cart' });
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
const addCourseToCart = async (req, res) => {
    try {
        const { userId } = req.params;
        const { courseId } = req.body;

        if (!userId || !courseId) {
            return res.status(400).json({ message: 'Missing userId or courseId' });
        }

        const result = await cartModel.addCourseToCart(userId, courseId);

        if (result) {
            return res.status(201).json({ success: true, message: 'Course added to cart successfully' });
        } else {
            return res.status(400).json({ success: false, message: 'Failed to add course to cart' });
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};


const isCourseInCart = async (req, res) => {
    try {
        const { userId, courseId } = req.params;

        if (!userId || !courseId) {
            return res.status(400).json({ message: 'Missing userId or courseId' });
        }

        const isInCart = await cartModel.isCourseInCart(userId, courseId);

        return res.status(200).json({ success: true, isInCart });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    getListCourseInCartUserId,deleteCourseInCart, deleteMultipleCoursesFromCart, addCourseToCart, isCourseInCart
};
