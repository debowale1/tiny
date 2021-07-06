const catchAsync = require('./../utils/catchAsync');
const Comment = require('./../models/commentModel');
const { deleteOne } = require('./factory');

exports.getAllComments = catchAsync(async(req, res, next) => {
  let filter = {};
  
  if(req.params.postId) filter = {postId: req.params.postId};
  
  comments = await Comment.find(filter);


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
exports.deleteComment = deleteOne(Comment)