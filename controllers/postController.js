const Post = require('./../models/postModel');
const { deleteOne, updateOne, createOne, getOne, getAll } = require('./factory');


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

exports.getAuthor = (req, res, next) => {
  req.body.author = req.user.name;
  next();
 }
    


exports.getAllPosts = getAll(Post);

exports.getPost = getOne(Post, { path: 'comments' })

exports.createPost = createOne(Post)
exports.updatePost = updateOne(Post)
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