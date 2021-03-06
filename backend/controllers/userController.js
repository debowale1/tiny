const User =  require('./../models/userModel');
const asyncHandler = require('express-async-handler')
const { deleteOne, updateOne, getOne, getAll } = require('./factory');


const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach(el => {
    if(allowedFields.includes(el)) newObj[el] = obj[el]
  });
  return newObj;
}


exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
}


exports.updateMe = asyncHandler(async(req, res) => {
  // 1) throw an error if user tries to update password
  if(req.body.password || req.body.passwordConfirm){
    res.status(401)
    throw new Error('You can\'t update password from this route. Please us /updateMyPassword')
  }

  //update the user
  const filteredBody = filterObj(req.body, 'name', 'email');
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    runValidators: true,
    new: true
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser
    }
  })

})

exports.deleteMe = async (req, res, next) => {
  //find user by id
  await User.findByIdAndUpdate(req.user.id, { active: false});
  
  res.status(204).json({
    status: 'success',
    data: {
      user: null
    }
  })

}


exports.createUser = asyncHandler(async (req, res) => {
  res.status(500)
  throw new Error('This route is not defined. Please use the /signup route')  
})

exports.getAllUser = getAll(User);
exports.getUser = getOne(User)
exports.updateUser = updateOne(User);
exports.deleteUser = deleteOne(User);


