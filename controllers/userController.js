const User =  require('./../models/userModel');

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

// exports.createUser = async (req, res) => {
//   const { name, email, password, passwordConfirm, photo } = req.body;
//   try {
//     const newUser = await User.create({
//       name,
//       email,
//       password,
//       passwordConfirm,
//       photo
//     });
//     res.status(201).json({
//       status: 'success',
//       data: {
//         users: newUser
//       }
//     });
    
//   } catch (error) {
//     res.status(500).json({
//       status: 'error',
//       error
//     })
//   }
// }

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


