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

exports.createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        users: newUser
      }
    });
    
  } catch (error) {
    res.status(500).json({
      status: 'error',
      error
    })
  }
}


