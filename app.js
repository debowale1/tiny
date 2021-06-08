const fs =  require('fs');
const express = require('express');

const app = express();

// 1) Middleware
app.use(express.json())

const postsObj = fs.readFileSync(`${__dirname}/dev-data/data/posts.json`, 'utf-8');
const posts = JSON.parse(postsObj);

// GET /api/v1/posts
// POST /api/v1/posts

app.get('/api/v1/posts', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: posts.length,
    data: {
      posts
    }
  })
});

app.get('/api/v1/posts/:slug', (req, res) => {

  const post = posts.find(el => el.slug === req.params.slug);
  res.status(200).json({
    status: 'success',
    data: {
      post
    }
  })
});

app.post('/api/v1/posts', (req, res) => {

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
})


const PORT = 2021
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
})