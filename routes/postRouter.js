const express = require('express');
const postController = require('../controllers/postController');
const authController = require('../controllers/authController');

const router = express.Router();

//aliasing
router.route('/backend-posts').get(postController.aliasBackendPosts, postController.getAllPosts);

router.route('/post-stats').get(postController.getPostStats);

router.use(authController.protect);
router.route('/')
      .get(postController.getAllPosts)
      .post(postController.createPost);

router.route('/:slug')
      .get(postController.getPost)
      .patch(postController.updatePost)
      .delete(authController.protect, authController.restrictTo('admin', 'editor'), postController.deletePost);

module.exports = router;