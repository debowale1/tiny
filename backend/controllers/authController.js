const {promisify} = require('util')
const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync')


const generateToken = id => {
  return jwt.sign({id}, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  })
}

const createSendToken = (user, statusCode, res) => {
  const token = generateToken(user._id);

  const cookieOptions = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000) ,
    httpOnly: true,
  }

  if( process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  res.cookie('jwt', token, cookieOptions);
  user.password = undefined

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user
    }
  });
}


exports.signup = async (req, res) => {
  const { name, email, password, passwordConfirm, photo } = req.body;
  try {
    const newUser = await User.create({
      name,
      email,
      password,
      passwordConfirm,
      photo
    });

    createSendToken(newUser, 201, res);
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error: 'error signing up'
    });
  }
}

exports.login = async (req, res) => {
  
  const { email, password } = req.body;
  try {
    //check username and password
    if(!email || !password) return res.status(400).json({status: 'error', message: 'please enter your email and password'});

    //check if the user exists and password is correct
    const user = await User.findOne({email}).select('+password');
    // const correctPassword = user.comparePassword(password, user.password);
    if(!user || !(await user.comparePassword(password, user.password))) {
      return next(res.status(401).json({ status: 'fail', message: 'invalid email or password'}));
    }

    //IF everything fine, create a valid token and send to the user for login
    createSendToken(user, 200, res);    
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error: 'error logging in'
    });
  }
}

// logout
exports.logout = async (req, res) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({status: 'success'});
}

//protect middleware is where you verify if a user is signed in
exports.protect = async (req, res, next) => {
  try {
    let token;
    //get the token from req.headers.authorization
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
      token = req.headers.authorization.split(' ')[1];
    }else if(req.cookies.jwt){
      token = req.cookies.jwt
    }

    if(!token) return res.status(401).json({ status: 'error', message: 'You are not logged. Please log in to access this route'})

    //verify the token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    //get the user with the payload
    const user = await User.findById(decoded.id);
    if(!user) return res.status(401).json({status: 'fail', message: 'the user no longer exist'});
    //save the current user in reqest object
    req.user = user;
    res.locals.user = user;
    next()
  } catch (err) {
    res.status(400).json({
      status: 'error',
      err
    });
  }
}

// only for rendered pages, no errors
exports.isLoggedIn = async (req, res, next) => {

    if(req.cookies.jwt){  
      try {
        //verify the token
        const decoded = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRET);
    
        //get the user with the payload
        const user = await User.findById(decoded.id);
        if(!user) return next();
        //THERE IS A LOGGED IN USER. save the current user in res.locals
        res.locals.user = user;
        return next();

      }catch(err){
        return next();
      }
    }
    next();
}

exports.restrictTo =  (...roles) => {
  return async (req, res, next) => {
    if(!roles.includes(req.user.role)){
      return next(res.status(403).json({status: 'error', message: "you do not have permission to perform this action"}))
    }
    next();
  }
}


exports.updatePassword = catchAsync(async (req, res, next) => {
  // 1) get user from collection
  const user = await User.findById(req.user.id).select('+password');
  
  // 2) Check if POSTed current password is correct
  if(!(await user.comparePassword(req.body.passwordCurrent, user.password))){
    return next(res.status(403).json({ status: 'error', message: "the password provided is incorrect" }));
  }
  // 3) if so, update password
  // User.findByIdAndUpdate() will NOT work because of our validator and presave hooks
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();
  // 4) Log user in, send JWT
  createSendToken(user, 200, res)
})