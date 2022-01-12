const path = require('path');
const express = require('express');
const morgan = require('morgan')
const dotenv = require('dotenv');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const cookieParser = require('cookie-parser');
const compression = require('compression')

const postRouter = require('./routes/postRouter');
const userRouter = require('./routes/userRouter');
const categoryRouter = require('./routes/categoryRouter');
const tagRouter = require('./routes/tagRouter');
const commentRouter = require('./routes/commentRouter');
const viewsRouter = require('./routes/viewsRouter');

const { errorHandler, notFound } = require('./middlewares/errorMiddleware')


dotenv.config();
const app = express();

// 1) Middleware
app.use(helmet());
//logging
if(process.env.NODE_ENV === 'development'){
  app.use(morgan('dev'));
}

//body parser
app.use(express.json( { limit: '50kb' }))
//cookie parser
app.use(cookieParser());
// data sanitization of req.body, req.query, req.params
app.use(xss());
//rate limiter
const limiter = rateLimit({
  windowsMs: 60 * 60 * 1000, // 1 hour
  max: 100,
  message: 'You have exhausted your request limit/hour. Please come back after an hour!'
});
app.use('/api', limiter);
// Data sanitize mongo db
app.use(mongoSanitize())
// serve static files
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }))




app.use((req, res, next) => {
  console.log(req.cookies.jwt);
  next();
})

app.use(compression())



app.use(function(req, res, next) { 
  res.setHeader( 'Content-Security-Policy', "script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://cdn.tiny.cloud https://cdnjs.cloudflare.com" ); 
  next(); 
})



//Mounting Routes
app.use('/', viewsRouter);
app.use('/api/v1/posts', postRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/comments', commentRouter);
app.use('/api/v1/categories', categoryRouter);
app.use('/api/v1/tags', tagRouter);

app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

if(process.env.NODE_ENV === 'production'){
  app.use(express.static(path.join(__dirname, '/frontend/build')))

  app.get('*', (req, res) => {
    return res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  })

}else{
  app.get('/', (req, res) => {
    res.send('Welcome to this API...')
  })
}

//Not Found middleware
app.use(notFound)

//Error middleware
app.use(errorHandler)




module.exports = app;