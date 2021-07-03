const express = require('express');
const { protect } = require('../controllers/authController');
const { getAllTags, createTag, updateTag, getTag, deleteTag } = require('../controllers/tagController');
const router = express.Router()

router.use(protect)
router.route('/').get(getAllTags).post(createTag);

router.route('/:id').get(getTag).patch(updateTag).delete(deleteTag);



module.exports = router;