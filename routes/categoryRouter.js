const express = require('express');
const { getAllCategories, createcategory } = require('../controllers/categoryController');
const router = express.Router()

router.route('/').get(getAllCategories).post(createcategory);

module.exports = router;