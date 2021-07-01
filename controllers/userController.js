const User =  require('./../models/userModel');


const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach(el => {
    if(allowedFields.includes(el)) newObj[el] = obj[el]
  });
  return newObj;
}


exports.getAllUser = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      status: 'success',
      result: users.length,
      data: {
        users
      }
    })
    
  } catch (error) {
    res.status(500).json({
      status: 'error',
      error
    });
  }
}

exports.updateMe = async(req, res, next) => {
  // 1) throw an error if user tries to update password
  if(req.body.password || req.body.passwordConfirm){
    return next(res.status(401).json({status: 'error', message: 'You can\'t update password from this route. Please us /updateMyPassword' }));
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

}

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


exports.createUser = async (req, res) => {
    res.status(500).json({
      status: 'error',
      message: "please use the /signup route"
    })
  
}

exports.getUser = async(req, res) => {
  try {
    const user = await User.findById(req.params.id);

    res.status(200).json({
      status: 'success',
      data: {
        user
      }
    })
  } catch (error) {
    res.status(404).json({
      status: 'error',
      error
    })
  }
}

exports.updateUser = async(req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new:true,
      runValidator: true
    });

    res.status(200).json({
      status: 'success',
      data: {
        user
      }
    })
  } catch (error) {
    res.status(404).json({
      status: 'error',
      error
    })
  }
}
exports.deleteUser = async(req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if(!user) return res.status(404).json({message: 'no user with the ID'});

    res.status(200).json({
      status: 'success',
      data: {
        user: null
      }
    })
  } catch (error) {
    res.status(404).json({
      status: 'error',
      error
    })
  }
}


