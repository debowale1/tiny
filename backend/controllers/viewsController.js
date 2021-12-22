const Post = require('./../models/postModel');
const Category = require('./../models/categoryModel');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync')





exports.index = catchAsync( async (req, res, next) => { 
  const posts = await Post.find({ isFeatured: { $ne: true } }).sort({ _id: -1});
  const featuredPosts = await Post.find( {isFeatured: true} ).sort({ _id: -1}).limit(3);
  const categories = await Category.find();
  const recentPosts = await Post.find().sort({ _id: -1}).limit(5);
  res.status(200).render('index', { 
    title: 'Tiny Blog | All Posts', 
    posts,
    featuredPosts,
    categories,
    recentPosts
  });
})

exports.singlePost = catchAsync( async (req, res, next) => {
  const categories = await Category.find()
  //get the post with the :slug and populate with the comment
  const post = await Post.findOne({ slug: req.params.slug }).populate('comments')
  if(!post){
    return next(res.status(404).json({ status: 'fail', message: 'No post with that slug' }))
  }
  console.log(post);
  // get 2 related posts (by category) of the current post  
  // const relatedPosts = await Post.find({ category: post.category, slug: { $ne: post.slug} }).select('title slug').sort('+createdAt').limit(2);
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
  const recentPosts = await Post.find().sort({ _id: -1}).limit(5);
  res.status(200).render('single-post', {
    post,
    categories,
    // relatedPosts,
    prevPost,
    nextPost,
    title: `TinyBlog | ${post.title}`,
    recentPosts
  });
});

exports.postsByCategory = catchAsync( async (req, res, next) => {
  const category = await Category.findOne({ 'name': req.params.name })
  if(!category){
    return next(res.status(404).json({status: 'error', message: 'No Category with that name'}))
  }
  const posts = await Post.find({ 'category': category._id }).sort({ _id: -1});
  const categories = await Category.find();
  const recentPosts = await Post.find().sort({ _id: -1}).limit(5);
  res.status(200).render('posts-by-category', { 
    title: `Tiny Blog | All Posts in ${category.name}`, 
    category,
    posts,
    categories,
    recentPosts 
  });
});

exports.submitArticle = catchAsync( async (req, res, next) => {
  const infoErrorsObj = req.flash('infoErrors')
  const infoSuccessObj = req.flash('infoSuccess')
  const categories = await Category.find();
  res.status(200).render('submit-article', { 
    title: `Tiny Blog | Submit Article`, 
    categories, 
    infoErrorsObj,
    infoSuccessObj
  });
});

exports.signin = catchAsync( async (req, res, next) => {
  const infoErrorsObj = req.flash('infoErrors')
  const infoSuccessObj = req.flash('infoSuccess')
  res.status(200).render('login', { 
    layout: './layouts/auth',
    title: `Tiny Blog | Login to your account`, 
    infoErrorsObj,
    infoSuccessObj 
  });
});
exports.signup = catchAsync( async (req, res, next) => {
  const infoErrorsObj = req.flash('infoErrors')
  const infoSuccessObj = req.flash('infoSuccess')
  
  res.status(200).render('register', { 
    layout: './layouts/auth',
    title: `Tiny Blog | Register new account`, 
    infoErrorsObj,
    infoSuccessObj
  });
});

exports.searchPosts = catchAsync( async (req, res, next) => {
  const posts = await Post.find({ $text: { $search: req.body.searchTerm, $diacriticSensitive: true } });
  const categories = await Category.find();
  const recentPosts = await Post.find().sort({ _id: -1}).limit(5);
  res.status(200).render('search', { 
    title: `Tiny Blog | All Posts`, 
    posts,
    categories, 
    recentPosts
  });
});

exports.signupOnSubmit = catchAsync( async (req, res, next) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    
  })
  const savedUser = await user.save()
  // console.log(req.body);
  if(savedUser){
    req.flash('infoSuccess', 'Your account has been created. Check your email to activate your account')
    res.redirect('/login');
  }else{
    req.flash('infoErrors', 'someting went wrong')
    res.redirect('/register')

  }

});
// exports.loginOnSubmit = catchAsync( async (req, res, next) => {
  
//   const user = new User({
//     name: req.body.name,
//     email: req.body.email,
//     password: req.body.password,
//     passwordConfirm: req.body.passwordConfirm,
    
//   })
//   const savedUser = await user.save()
//   // console.log(req.body);
//   if(savedUser){
//     req.flash('infoSuccess', 'Your account has been created. Check your email to activate your account')
//     res.redirect('/login');
//   }else{
//     req.flash('infoErrors', 'someting went wrong')
//     res.redirect('/register')

//   }

// });

exports.submitArticleOnPost = catchAsync( async (req, res, next) => {
  const category = await Category.findOne({ 'name': req.body.category})
  const post = new Post({
    title: req.body.title,
    body: req.body.body,
    author: 'Jane',
    category: category._id,
    image: 'image.jpg'
  })
  const savedPost = await post.save()
  // console.log(req.body);
  if(savedPost){
    req.flash('infoSuccess', 'post has been submitted! An admin/Editor will go through before it can apper on the front page')
    res.redirect('/submit-article');
  }else{
    req.flash('infoErrors', 'someting went wrong')
    res.redirect('/submit-article')

  }

});


// Admin Dashboard
exports.adminIndex = catchAsync(async(req, res, next) => {
  res.status(200).render('dashboard/index', {
    layout: './layouts/dashboard',
    title: 'Tiny Blog | Admin Dashboard'
  })
})
exports.adminAddPost = catchAsync(async(req, res, next) => {
  const categories = await Category.find();
  res.status(200).render('dashboard/add-post', {
    layout: './layouts/dashboard',
    title: 'Tiny Blog | Add Post',
    categories
  })
})
exports.adminAllPosts = catchAsync(async(req, res, next) => {
  const posts = await Post.find().sort({ _id: -1 })
  res.status(200).render('dashboard/all-posts', {
    layout: './layouts/dashboard',
    title: 'Tiny Blog | Add Post',
    posts
  })
})
exports.adminCategory = catchAsync(async(req, res, next) => {
  const categories = await Category.find().sort({ _id: -1 })
  res.status(200).render('dashboard/category', {
    layout: './layouts/dashboard',
    title: 'Tiny Blog | All Categories',
    categories
  })
})
exports.adminProfile = async(req, res) => {
  res.status(200).render('dashboard/profile', {
    layout: './layouts/dashboard',
    title: 'Tiny Blog | My Profile',
  })
}

exports.adminAddPostOnSubmit = catchAsync(async(req, res, next) => {
  console.log(req.body);
  const categories = await Category.find();
  res.render('dashboard/add-post', {
    layout: './layouts/dashboard',
    title: 'Tiny Blog | Add Post',
    categories
  })
})


