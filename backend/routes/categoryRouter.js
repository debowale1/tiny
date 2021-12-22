const express = require('express');
const { restrictTo, protect } = require('../controllers/authController');
const { getAllCategories, createcategory, updateCategory, getCategory, deleteCategory } = require('../controllers/categoryController');
const router = express.Router()

router.use(protect);
router.use(restrictTo('admin'));

router.route('/').get(getAllCategories).post(createcategory);
router.route('/:id').get(getCategory).patch(updateCategory).delete(deleteCategory);

module.exports = router;