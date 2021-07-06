const Post = require('./../models/postModel');
const { deleteOne } = require('./factory');


exports.aliasBackendPosts = async (req, res, next) => {
  req.query.category = "Backend Development";
  req.query.limit = '5';
  req.query.fields = 'title,body,category'
  next();
}

exports.getAllPosts = async (req,res) => {
  try {
    // console.log(req.query)
    //save a copy of req.query
    const queryObj = {...req.query};
  
    //remove some keywords from req.query
    //1) Filtering
    const excludedFields = ['fields', 'sort', 'limit', 'page'];
    excludedFields.forEach(el => delete queryObj[el]);

    // console.log(queryObj);
    let query = Post.find(queryObj); //returns a query

    // 2) SORTING: if query object consists of 'sort' field
    if(req.query.sort){
      const sortBy = req.query.sort.split(',').join(' ');
      query.sort(sortBy);
    }else{
      query.sort('-createdAt');
    }

    //3) FIELDS SELECTION
    if(req.query.fields){
      const fields = req.query.fields.split(',').join(' ');
      query.select(fields);
    }else{
      query.select('-__v');
    }

    //4) PAGINATION
    if(req.query.page){
      const page = +req.query.page || 1;
      const limit = +req.query.limit || 100;
      const skip = limit * (page - 1);
      query.skip(skip).limit(limit);
    }

    // await posts here
    const posts = await query;

    res.status(200).json({
      status: 'success',
      results: posts.length,
      data: {
        posts
      }
    })
    
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      error
    })
  }
}

exports.getPost = async (req, res, next) => {
  // const post = posts.find(el => el.slug === req.params.slug);
  const {id} = req.params;
  const post = await Post.findById(id).populate('comments');

  // if(!post) return res.status(404).json({status: 'fail', message: 'Not Found'})
  if(!post) return next(res.status(404).json({status: 'fail', message: 'Not Found'}));

  res.status(200).json({
    status: 'success',
    data: {
      post
    }
  })
}

exports.createPost = async (req, res) => {
  const { title, body, featuredImage, category, tags } = req.body;

  console.log(req.user);
  try {

    const post = await Post.create({
      title,
      body,
      author: req.user.name,
      category,
      tags,
      featuredImage
    });
    res.status(201).json({
      status: 'success',
      data: {
        post
      }
    })
    
  } catch (error) {
    res.status(500).json({
      status: 'error',
      error
    })
  }

}

exports.updatePost = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedPost = await Post.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    });
    res.status(200).json({
      status: 'success',
      data: {
        post: updatedPost
      }
    })
    
  } catch (error) {
    res.status(500).json({
      status: 'error',
      error
    })
  }
}

exports.deletePost = async (req, res) => {
  try {
    const { id } = req.params
    const post = await Post.findByIdAndDelete(id)
    if(!post) return res.status(404).json({status: 'error', message: 'post not found'});

    //send response to client
    res.status(204).json({
      status: 'success',
      data: {
        post: null
      }
    });
    
  } catch (error) {
    res.status(500).json({
      status: 'error',
      error
    });
  }
}

exports.deletePost = deleteOne(Post);

exports.getPostStats = async (req, res) => {
  try {
    const stats = await Post.aggregate([
      { 
        $match: { numComment: { $gte: 10 } }
      },{
        $group: {
          _id: { $toUpper: '$category'},
          numPosts: { $sum: 1 },
          totalComment: { $sum: '$numComment' },
          minComment: { $min: '$numComent' },
          maxComment: { $max: '$numComent' },
         }
      },{
        $sort: {totalComment: 1}
      }
    ]);

    res.status(200).json({
      status: 'success',
      stats
    });
  } catch (error) {
    res.status(404).json({
      status: 'error',
      error
    });
  }
}