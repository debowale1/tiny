const Post = require('./../models/postModel');
const Category = require('./../models/categoryModel');
const catchAsync = require('./../utils/catchAsync')


exports.index = catchAsync( async (req, res, next) => { 
  const posts = await Post.find({ isFeatured: { $ne: true } }).sort({ _id: -1});
  const featuredPosts = await Post.find( {isFeatured: true} ).sort({ _id: -1}).limit(3);
  const categories = await Category.find();
  res.status(200).render('index', { 
    title: 'Tiny Blog | All Posts', 
    posts,
    featuredPosts,
    categories, 
  });
})

exports.singlePost = catchAsync( async (req, res, next) => {
  const categories = await Category.find()
  //get the post with the :slug and populate with the comment
  const post = await Post.findOne({ slug: req.params.slug }).populate('comments')
  if(!post){
    return next(res.status(404).json({ status: 'fail', message: 'No post with that slug' }))
  }
  // get 2 related posts (by category) of the current post  
  // const relatedPosts = await Post.find({ category: post.category, slug: { $ne: post.slug} }).select('title slug').sort('+createdAt').limit(2);
  // get the previous post to the current post
  // let prevPost = await Post.findOne({ _id: {$lt : post._id} }).select('slug').sort({_id: -1}).limit(1);
  // if(!prevPost) {
  //   prevPost = await Post.findOne().select('slug').sort({_id: -1 }).limit(1);
  // }
  // get the next post to the current post
  // let nextPost = await Post.findOne({ _id: {$gt : post._id} }).select('slug').sort({_id: 1}).limit(1);
  // if(!nextPost) {
  //    nextPost = await Post.findOne().select('slug').sort({_id: 1 }).limit(1);
  // }
  res.status(200).render('single-post', {
    post,
    categories,
    // relatedPosts,
    // prevPost,
    // nextPost,
    title: `TinyBlog | ${post.title}`
  });
});

exports.postsByCategory = catchAsync( async (req, res, next) => {
  const category = await Category.findOne({ 'name': req.params.name })
  const posts = await Post.find({ 'category': category._id }).sort({ _id: -1});
  const categories = await Category.find();
  // console.log(category);
  res.status(200).render('posts-by-category', { 
    title: `Tiny Blog | All Posts in ${category.name}`, 
    category,
    posts,
    categories, 
  });
})

exports.login = async (req, res) => {
  res.render('login', { title: 'Login' });
}

exports.signup = async (req, res) => {
  res.render('register', { title: 'Register'});
} 