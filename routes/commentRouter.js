const express = require('express');
const { getAllComments, createComment } = require('../controllers/commentController');
const authController = require('../controllers/authController')

const router = express.Router();
router.use(authController.protect);
router.route('/').get(getAllComments).post(createComment);

module.exports = router;