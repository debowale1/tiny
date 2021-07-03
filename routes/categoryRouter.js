const express = require('express');
const { getAllCategories, createcategory, updateCategory, getCategory, deleteCategory } = require('../controllers/categoryController');
const router = express.Router()

router.route('/').get(getAllCategories).post(createcategory);

router.route('/:id').get(getCategory).patch(updateCategory).delete(deleteCategory);

module.exports = router;