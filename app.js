const express = require('express');
const morgan = require('morgan')
const dotenv = require('dotenv');
const postRouter = require('./routes/postRouter');
const userRouter = require('./routes/userRouter');
const categoryRouter = require('./routes/categoryRouter');
const tagRouter = require('./routes/tagRouter');
const commentRouter = require('./routes/commentRouter');


dotenv.config();
const app = express();

// 1) Middleware
app.use(express.json())
app.use(express.static(`${__dirname}/public`))

if(process.env.NODE_ENV === 'development'){
  app.use(morgan('dev'));
}



//Mounting Routes
app.use('/api/v1/posts', postRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/comments', commentRouter);
app.use('/api/v1/categories', categoryRouter);
app.use('/api/v1/tags', tagRouter);




module.exports = app;