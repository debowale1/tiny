const express = require('express');
const { getAllComments, createComment, deleteComment } = require('../controllers/commentController');
const authController = require('../controllers/authController')

const router = express.Router();

router.use(authController.protect);

router.route('/').get(getAllComments).post(createComment);
router.route('/:id').delete(deleteComment);

module.exports = router;