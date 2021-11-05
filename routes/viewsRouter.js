const express = require('express');
const viewsController = require('./../controllers/viewsController');
const authController = require('./../controllers/authController')
const router = express.Router();

router.use(authController.isLoggedIn);

router.get('/', viewsController.index)
router.get('/submit-article', viewsController.submitArticle)
router.get('/login', viewsController.signin)
router.get('/register', viewsController.signup)
router.get('/tiny-admin', authController.protect, authController.restrictTo('admin'), viewsController.adminIndex)
router.get('/tiny-admin/add-post', authController.protect, authController.restrictTo('admin'), viewsController.adminAddPost)
router.get('/:slug', viewsController.singlePost)
router.get('/category/:name', viewsController.postsByCategory)
router.post('/search', viewsController.searchPosts)
router.post('/submit-article', viewsController.submitArticleOnPost)
router.post('/register', viewsController.signupOnSubmit)
// router.post('/login', viewsController.loginOnSubmit)





module.exports = router;