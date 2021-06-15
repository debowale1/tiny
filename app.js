const express = require('express');
const morgan = require('morgan')
const dotenv = require('dotenv');
const postRouter = require('./routes/postRouter');
const userRouter = require('./routes/userRouter');


dotenv.config();
const app = express();

// 1) Middleware
app.use(express.json())

if(process.env.NODE_ENV === 'development'){
  app.use(morgan('dev'));
}



//Mounting Routes
app.use('/api/v1/posts', postRouter);
app.use('/api/v1/users', userRouter);




module.exports = app;