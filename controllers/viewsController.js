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
  const relatedPosts = await Post.find({ category: post.category, slug: { $ne: post.slug} }).select('title slug').sort('+createdAt').limit(2);
  // const prev = await Post.findOne({
  //   slug: { $ne: req.params.slug },
  // }).select('slug').sort({
  //   createdAt: -1
  // }).limit(1);
  // const next = await Post.findOne({
  //   slug: { $ne: req.params.slug },
  // }).select('slug').sort({
  //   createdAt: 1
  // }).limit(1);
  res.render('post-single', {
    post,
    relatedPosts,
    // prev,
    // next,
    title: post.title
  });
})
  // res.render('post-single', {
  //   post,
  //   title: post.title
  // });
// })