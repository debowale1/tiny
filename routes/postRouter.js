const express = require('express');
const postController = require('../controllers/postController');

const router = express.Router();

router.route('/')
      .get(postController.getAllPosts)
      .post(postController.createPost);

router.route('/:slug')
      .get(postController.getPost)
      .patch(postController.updatePost)
      .delete(postController.deletePost);

module.exports = router;