const express = require('express');
const viewsController = require('./../controllers/viewsController');
const authController = require('./../controllers/authController')
const router = express.Router();

// router.use(authController.isLoggedIn);

router.get('/', authController.isLoggedIn, viewsController.index)
router.get('/submit-article', authController.isLoggedIn, viewsController.submitArticle)
router.get('/login', viewsController.signin)
router.get('/register', viewsController.signup)
router.get('/dashboard', authController.protect, authController.restrictTo('admin'), viewsController.adminIndex)
router.get('/add-post', authController.protect, authController.restrictTo('admin'), viewsController.adminAddPost)
router.get('/all-posts', authController.protect, authController.restrictTo('admin'), viewsController.adminAllPosts)
router.get('/category', authController.protect, authController.restrictTo('admin'), viewsController.adminCategory)
router.get('/me', authController.protect, authController.restrictTo('admin', 'user'), viewsController.adminProfile)
// router.get('/user-dashboard', authController.protect, authController.restrictTo('user'), viewsController.userIndex)
router.get('/:slug', authController.isLoggedIn, viewsController.singlePost)
router.get('/category/:name', authController.isLoggedIn, viewsController.postsByCategory)

router.post('/search', viewsController.searchPosts)
router.post('/submit-article', viewsController.submitArticleOnPost)
router.post('/register', viewsController.signupOnSubmit)
router.post('/add-post', viewsController.adminAddPostOnSubmit)





module.exports = router;