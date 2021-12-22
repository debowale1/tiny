const express = require('express');
const { getAllComments, createComment, deleteComment, updateComment, setPostUserIds, getComment } = require('../controllers/commentController');
const authController = require('../controllers/authController')

const router = express.Router({ mergeParams: true });

router.use(authController.protect);

router.route('/').get(getAllComments).post(setPostUserIds, createComment);

router.route('/:id').get(getComment).patch(updateComment).delete(deleteComment);

module.exports = router;


// POST /posts/2f456c556/comments - create new comment on a post
// GET /posts/2f456c556/comments - get comments of a particular post
// GET /posts/2f456c556/comments/56g8aA87 - get a comment of a particular post