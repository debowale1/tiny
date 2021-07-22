const path = require('path');
const express = require('express');
const morgan = require('morgan')
const dotenv = require('dotenv');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');


const postRouter = require('./routes/postRouter');
const userRouter = require('./routes/userRouter');
const categoryRouter = require('./routes/categoryRouter');
const tagRouter = require('./routes/tagRouter');
const commentRouter = require('./routes/commentRouter');


dotenv.config();
const app = express();

// 1) Middleware
//logging
if(process.env.NODE_ENV === 'development'){
  app.use(morgan('dev'));
}
//views engine
app.set('views engine', 'pug');
app.set('views', path.join(__dirname, 'views'))

//body parser
app.use(express.json( { limit: '50kb' }))
//serve static files
app.use(express.static(`${__dirname}/public`))

//rate limiter
const limiter = rateLimit({
  windowsMs: 60 * 60 * 1000, // 1 hour
  max: 3,
  message: 'You have exhausted your request limit/hour. Please come back after an hour!'
});
app.use('/api', limiter);
// Data sanitize mongo db
app.use(mongoSanitize())



//Mounting Routes
app.use('/api/v1/posts', postRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/comments', commentRouter);
app.use('/api/v1/categories', categoryRouter);
app.use('/api/v1/tags', tagRouter);




module.exports = app;