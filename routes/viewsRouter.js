const express = require('express');
const viewsController = require('./../controllers/viewsController');
const authController = require('./../controllers/authController')
const router = express.Router();

router.use(authController.isLoggedIn);

router.get('/', viewsController.index)
router.get('/login', viewsController.login)
router.get('/:slug', viewsController.getPost)

module.exports = router;