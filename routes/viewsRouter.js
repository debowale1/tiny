const express = require('express');
const viewsController = require('./../controllers/viewsController');
const authController = require('./../controllers/authController')
const router = express.Router();

router.use(authController.isLoggedIn);

router.get('/', viewsController.index)
router.get('/login', viewsController.login)
router.get('/register', viewsController.signup)
router.get('/:slug', viewsController.singlePost)

module.exports = router;