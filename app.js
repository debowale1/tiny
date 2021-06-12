const express = require('express');
const dotenv = require('dotenv');
const postsController = require('./controllers/postsController');


dotenv.config();
const app = express();

// 1) Middleware
app.use(express.json())


app.get('/api/v1/posts', postsController.getAllPosts);
app.post('/api/v1/posts', postsController.createPost);

app.get('/api/v1/posts/:slug', postsController.getPost);
app.patch('/api/v1/posts/:slug', postsController.updatePost)
app.delete('/api/v1/posts/:slug', postsController.deletePost);




module.exports = app;