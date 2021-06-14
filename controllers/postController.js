const Post = require('./../models/postModel');

exports.getAllPosts = async (req,res) => {

  try {
    const posts = await Post.find();
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

exports.getPost = async (req, res) => {
  // const post = posts.find(el => el.slug === req.params.slug);
  const {slug} = req.params;
  const post = await Post.findOne({slug});

  if(!post) return res.status(404).json({status: 'fail', message: 'Not Found'})

  res.status(200).json({
    status: 'success',
    data: {
      post
    }
  })
}

exports.createPost = async (req, res) => {
  const { title, body, featuredImage, categories, tags } = req.body;

  try {
  
    const post = await Post.create({
      title,
      body,
      categories,
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
  const { slug } = req.params;
  try {
    const updatedPost = await Post.findOneAndUpdate(slug, req.body, {
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
    const { slug } = req.params
    const post = await Post.findOneAndDelete({slug})
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
    })
  }
}