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
  //Allow nested routes
  if(!req.body.postId) req.body.postId = req.params.postId;
  if(!req.body.userId) req.body.userId = req.user.id;
  const comments = await Comment.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      comments
    }
  })
})
//delete comment
exports.deleteComment = catchAsync(async(req, res, next) => {
  
  await Comment.findById(req.params.id);

  res.status(204).json({
    status: 'success',
    data: {
      comment: null
    }
  })
})