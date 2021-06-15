const mongoose = require('mongoose');
const slugify = require('slugify');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'A post must have a title'],
    trim: true,
    minLength: [10, 'A post title must be at least 10 characters long']
  },
  slug: String,
  body: {
    type: String,
    required: [true, 'A post must have a body'],
  },
  category: {
    type: String,
    required: [true, 'A post must have at least one category'],
  },
  featuredImage: {
    type: String,
    required: [true, 'A post must have a featured image'],
  },
  tags: [String],
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



// 2) Query Middleware: alway call next()

const Post = mongoose.model('Post', postSchema);
module.exports = Post;