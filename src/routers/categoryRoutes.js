const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

router.get('/', categoryController.getCategories);
router.get('/v1', categoryController.getCategoriesV1);
router.get('/v2', categoryController.getCategoriesV2);
router.get('/course-categories', categoryController.getCourseCategories);

module.exports = router;
