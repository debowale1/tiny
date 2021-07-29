const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');
const commentRouter = require('./commentRouter')
const router = express.Router();


// GET /user/:id
router.use('/:userId/comments', commentRouter);

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout)

//only signed in user can access these routes
router.use(authController.protect);

router.patch('/updateMyPassword', authController.updatePassword);
router.patch('/updateMe', userController.updateMe);
router.delete('/deleteMe', userController.deleteMe);
router.get('/me', userController.getMe, userController.getUser);

//only admins can access these routes from here
router.use(authController.restrictTo('admin'))
router.route('/')
      .get(userController.getAllUser)
      .post(userController.createUser);

router.route('/:id')
      .get(userController.getUser)
      .patch(userController.updateUser)
      .delete(userController.deleteUser);


module.exports = router;