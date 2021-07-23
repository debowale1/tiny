const Post = require('./../models/postModel');
const Category = require('./../models/categoryModel');
const catchAsync = require('./../utils/catchAsync')


exports.index = catchAsync( async (req, res) => {
  const posts = await Post.find().select('+createdAt');
  const categories = await Category.find();
  res.render('index', { 
    posts,
    categories, 
    title: 'All Posts' 
  });
})

exports.getPost = catchAsync( async (req, res) => {
  const post = await Post.findOne({ slug: req.params.slug }).populate('comments');
  res.render('post-single', {
    post,
    title: post.title
  });
})