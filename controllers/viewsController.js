const Post = require('./../models/postModel');
const Category = require('./../models/categoryModel');
const catchAsync = require('./../utils/catchAsync')


exports.index = catchAsync( async (req, res, next) => {
  const posts = await Post.find({isFeatured: { $ne: true}}).select('+createdAt');
  const featuredPosts = await Post.find( {isFeatured: true});
  const categories = await Category.find();
  res.status(200).render('index', { 
    posts,
    featuredPosts,
    categories, 
    title: 'All Posts' 
  });
})

exports.getPost = catchAsync( async (req, res) => {
  //get the post with the :slug and populate with the comment
  const post = await Post.findOne({ slug: req.params.slug }).populate('comments');
  // get 2 related posts (by category) of the current post  
  const relatedPosts = await Post.find({ category: post.category, slug: { $ne: post.slug} }).select('title slug').sort('+createdAt').limit(2);
  // get the previous post to the current post
  let prevPost = await Post.findOne({ _id: {$lt : post._id} }).select('slug').sort({_id: -1}).limit(1);
  if(!prevPost) {
    prevPost = await Post.findOne().select('slug').sort({_id: -1 }).limit(1);
  }
  // get the next post to the current post
  let nextPost = await Post.findOne({ _id: {$gt : post._id} }).select('slug').sort({_id: 1}).limit(1);
  if(!nextPost) {
     nextPost = await Post.findOne().select('slug').sort({_id: 1 }).limit(1);
  }
  res.status(200).render('post-single', {
    post,
    relatedPosts,
    prevPost,
    nextPost,
    title: post.title
  });
});

exports.login = async (req, res) => {
  res.render('login', { title: 'Login' });
}

exports.signup = async (req, res) => {
  res.render('register', { title: 'Register'});
} 