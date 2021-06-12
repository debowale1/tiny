const fs =  require('fs');
const postsObj = fs.readFileSync(`${__dirname}/../dev-data/data/posts.json`, 'utf-8');
const posts = JSON.parse(postsObj);

exports.getAllPosts = (req,res) => {
  res.status(200).json({
    status: 'success',
    results: posts.length,
    data: {
      posts
    }
  })
}

exports.getPost = (req, res) => {
  const post = posts.find(el => el.slug === req.params.slug);
  res.status(200).json({
    status: 'success',
    data: {
      post
    }
  })
}

exports.createPost = (req, res) => {

  const newPost = req.body;
  posts.push(newPost);

  fs.writeFile(`${__dirname}/dev-data/data/posts.json`, JSON.stringify(posts), (err) => {
    if(err) return res.status(400).json({
      status: 'fail',
      message: 'not found'
    })
  });
  
  res.status(201).json({
    status: 'success',
    data: {
      post: newPost
    }
  })
}

exports.updatePost = (req, res) => {
  const post = req.body;
  res.status(200).json({
    status: 'success',
    data: {
      post
    }
  })
}

exports.deletePost = (req, res) => {

  const { slug } = req.params

  res.status(204).json({
    status: 'success',
    data: {
      post: `Posts with slug ${slug} was delete`
    }
  });
}