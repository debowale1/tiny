const mongoose = require('mongoose');
const { findByIdAndDelete, findOne } = require('./postModel');
const Post = require('./postModel');


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
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
},{
  timeStamps: true,
  toObject: {virtuals: true},
  toJSon: {virtuals: true},
})

commentSchema.pre(/^find/, function(next){
  this.populate({
    path: 'postId',
    select: 'title -tags -category'
  }).populate({
    path: 'userId',
    select: 'name photo'
  })

  next()
})
// commentSchema.pre(/^find/, function(next){
//   this.populate({
//     path: 'userId',
//     select: 'name photo createdAt'
//   })

//   next()
// })

//Statics methods
commentSchema.statics.calcTotalComments = async function(postId){
  const stats = await this.aggregate([
    {
      $match: { postId: postId }
    },
    {
      $group: {
        _id: '$postId', 
        nComment: {$sum: 1}
      }
    }
  ]);
  console.log(stats);

  if(stats.length > 0){
    await Post.findByIdAndUpdate(postId, {
      numComment: stats[0].nComment
    });
  }else{
    await Post.findByIdAndUpdate(postId, {
      numComment: 0
    });
}

}
commentSchema.post('save', function(){
  this.constructor.calcTotalComments(this.postId);
});

//findByIdAndUpdate
//findByIdAndDelete

commentSchema.pre(/^findOneAnd/, async function(next){
  const r = await findOne();
  console.log(r);
  next();
});

commentSchema.post(/^findOneAnd/, async function(){
  await this.r.constructor.calcTotalComments(this.r.postId);
});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;