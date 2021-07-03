const mongoose = require('mongoose');
const slugify = require('slugify');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'A post must have a title'],
    trim: true,
    minLength: [10, 'A post title must be at least 10 characters long']
  },
  slug: {
    type: String,
    unique: true
  },
  body: {
    type: String,
    required: [true, 'A post must have a body'],
  },
  category: {
    type: mongoose.Schema.ObjectId,
    ref: 'Category',
    required: [true, 'A post must have a category'],
  },
  numComment: {
    type: Number,
    default: 0
  },
  author: {
    type: String,
    required: [true, 'A post must have an author'],
  },
  featuredImage: {
    type: String,
    required: [true, 'A post must have a featured image'],
  },
  tags: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Tag'
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false
  }
},{
  //to show virtuals in output
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});
//You can include severall middlewares here

// 1) Document Middleware: alway call next()
postSchema.pre('save', function(next) {
  this.slug = slugify(this.title, { lower: true } )
  next();
})

//Query Middleware
postSchema.pre(/^find/, function(next){
  this.populate({path: 'tags', select: '-__v -createdAt -updatedAt'})
  next();
})
postSchema.pre(/^find/, function(next){
  this.populate({path: 'category', select: '-__v -createdAt -updatedAt'})
  next();
})



// 2) Query Middleware: alway call next()

const Post = mongoose.model('Post', postSchema);
module.exports = Post;