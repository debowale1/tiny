const express = require('express');
const { protect, restrictTo } = require('../controllers/authController');
const { getAllTags, createTag, updateTag, getTag, deleteTag } = require('../controllers/tagController');
const router = express.Router()

router.use(protect);
router.use(restrictTo('admin'));

router.route('/').get(getAllTags).post(createTag);
router.route('/:id').get(getTag).patch(updateTag).delete(deleteTag);



module.exports = router;