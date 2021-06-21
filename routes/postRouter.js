const express = require('express');
const postController = require('../controllers/postController');
const authController = require('../controllers/authController');

const router = express.Router();

//aliasing
router.route('/backend-posts').get(postController.aliasBackendPosts, postController.getAllPosts);

router.route('/post-stats').get(postController.getPostStats);

router.route('/')
      .get(authController.protect, postController.getAllPosts)
      .post(postController.createPost);

router.route('/:slug')
      .get(postController.getPost)
      .patch(postController.updatePost)
      .delete(postController.deletePost);

module.exports = router;