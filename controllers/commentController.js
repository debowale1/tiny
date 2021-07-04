const catchAsync = require('./../utils/catchAsync');
const Comment = require('./../models/commentModel');

exports.getAllComments = catchAsync(async(req, res, next) => {
  const comments = await Comment.find();

  res.status(200).json({
    status: 'success',
    result: comments.length,
    data: {
      comments
    }
  })
})
exports.createComment = catchAsync(async(req, res, next) => {
  const { comment, postId } = req.body;
  const comments = await Comment.create({
    comment,
    userId: req.user.id,
    postId

  });

  res.status(201).json({
    status: 'success',
    data: {
      comments
    }
  })
})