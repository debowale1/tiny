const express = require('express');
const postController = require('../controllers/postController');
const authController = require('../controllers/authController');
const { createComment } = require('../controllers/commentController');

const router = express.Router();

//aliasing
router.route('/backend-posts').get(postController.aliasBackendPosts, postController.getAllPosts);

router.route('/post-stats').get(postController.getPostStats);

router.use(authController.protect);
router.route('/')
      .get(postController.getAllPosts)
      .post(postController.createPost);

router.route('/:id')
      .get(postController.getPost)
      .patch(postController.updatePost)
      .delete(authController.restrictTo('admin', 'editor'), postController.deletePost);

router.route('/:postId/comments').post(createComment)

module.exports = router;

// POST /posts/2f456c556/comments - create new comment for on a post
// GET /posts/2f456c556/comments - get comments of a particular post
// GET /posts/2f456c556/comments/56g8aA87 - get a comment of a particular post