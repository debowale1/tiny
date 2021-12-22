const Comment = require('./../models/commentModel');
const catchAsync = require('./../utils/catchAsync');
const { deleteOne, updateOne, createOne, getOne, getAll } = require('./factory');

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
});

exports.setPostUserIds = (req, res, next) => {
  //Allow nested routes
  if(!req.body.postId) req.body.postId = req.params.postId;
  if(!req.body.userId) req.body.userId = req.user.id;
  next()
}
// exports.getAllComments = getAll(Comment);
exports.getComment = getOne(Comment);
exports.createComment = createOne(Comment);
exports.updateComment = updateOne(Comment);
exports.deleteComment = deleteOne(Comment);