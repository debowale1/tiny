const mongoose = require('mongoose');


const commentSchema = new mongoose.Schema({
  comment: {
    type: String,
    trim: true,
    require: [true,'please write a comment']
  },
  userId: {
    type: mongoose.Schema.ObjectId,
    required: true
  },
  postId: {
    type: mongoose.Schema.ObjectId,
    required: true
  }
},{
  timeStamps: true,
  toObject: {virtuals: true},
  toJSon: {virtuals: true},
})

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;