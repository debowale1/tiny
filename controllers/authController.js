const {promisify} = require('util')
const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');


const generateToken = (id) => {
  return jwt.sign({id}, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  })
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

    const token = generateToken(newUser._id);


    res.status(201).json({
      status: 'success',
      token,
      data: {
        user: newUser
      }
    });
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
    if(!user || !(await user.comparePassword(password, user.password))) return res.status(401).json({ status: 'fail', message: 'invalid email or password'});

    //IF everything fine, create a valid token and send to the user for login
    const token = generateToken(user._id);

    // req.user = user;
    // console.log(req)

    res.status(200).json({
      status: 'success',
      token
    })
    
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error: 'error logging in'
    });
  }
}

//protect middleware is where you verify if a user is signed in
exports.protect = async (req, res, next) => {
  try {
    let token;
    //get the token from req.headers.authorization
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
      token = req.headers.authorization.split(' ')[1];
    }

    if(!token) return res.status(401).json({ status: 'error', message: 'You are not logged. Please log in to access this route'})

    //verify the token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    //get the user with the payload
    const user = await User.findById(decoded.id);
    if(!user) return res.status(401).json({status: 'fail', message: 'the user no longer exist'});
    //save the current user in reqest object
    req.user = user;
    next()
  } catch (err) {
    res.status(400).json({
      status: 'error',
      err
    });
  }

  // next();
}