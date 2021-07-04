const mongoose = require('mongoose');


const commentSchema = new mongoose.Schema({
  comment: {
    type: String,
    trim: true,
    require: [true,'please write a comment']
  },
  userId: {
    type: mongoose.Schema.ObjectId,
    required: [true, 'comment must belong to a user'],
    ref: 'User'
  },
  postId: {
    type: mongoose.Schema.ObjectId,
    required: [true, 'comment must belong to a post'],
    ref: 'Post'
  }
},{
  timeStamps: true,
  toObject: {virtuals: true},
  toJSon: {virtuals: true},
})

commentSchema.pre(/^find/, function(next){
  this.populate({
    path: 'postId',
    select: 'title'
  }).populate({
    path: 'userId',
    select: 'name photo'
  })

  next()
})

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;