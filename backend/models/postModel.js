const mongoose = require('mongoose');
const slugify = require('slugify');
const domPurifier = require('dompurify')
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const htmlPurify = domPurifier(new JSDOM().window)

const {stripHtml} = require('string-strip-html')

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
  snippet: {
    type: String,
    required: [true, 'A post must have a snippet']
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
  image: {
    type: String,
  },
  tags: [
    {
      type: String,
    }
  ],
  isFeatured: {
    type: Boolean,
    default: false
  },
  published: {
    type: Boolean,
    default: false
  },
  isDraft: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    // select: false
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

postSchema.pre('validate', function(next){
  if(this.body){
    this.body = htmlPurify.sanitize(this.body)
    this.snippet = stripHtml(this.body.substr(0, 90)).result
  }
  next()
})

//Query Middleware
postSchema.pre(/^find/, function(next){
  this.populate({
    path: 'tags', 
    select: '-__v -createdAt -updatedAt'
  }).populate({
    path: 'category', 
    select: '-__v -createdAt -updatedAt'
  })
  next();
})

//Virtual Populate: 
postSchema.virtual('comments', {
  ref: 'Comment', // The model to use
  localField: '_id', // Find posts where `localField`
  foreignField: 'postId', // is equal to `foreignField`
  // count: true // And only get the number of docs
});

//enable search
postSchema.index({title: 'text', body: 'text'})

const Post = mongoose.model('Post', postSchema);
module.exports = Post;