const express = require('express');
const viewsController = require('./../controllers/viewsController');
const authController = require('./../controllers/authController')
const router = express.Router();

// router.use(authController.isLoggedIn);

router.get('/', authController.isLoggedIn, viewsController.index)
router.get('/submit-article', authController.isLoggedIn, viewsController.submitArticle)
router.get('/login', viewsController.signin)
router.get('/register', viewsController.signup)
router.get('/tiny-admin', authController.protect, authController.restrictTo('admin'), viewsController.adminIndex)
router.get('/tiny-admin/add-post', authController.protect, authController.restrictTo('admin'), viewsController.adminAddPost)
router.get('/tiny-admin/all-posts', authController.protect, authController.restrictTo('admin'), viewsController.adminAllPosts)
router.get('/tiny-admin/category', authController.protect, authController.restrictTo('admin'), viewsController.adminCategory)
router.get('/user-dashboard', authController.protect, authController.restrictTo('user'), viewsController.userIndex)
router.get('/:slug', authController.isLoggedIn, viewsController.singlePost)
router.get('/category/:name', authController.isLoggedIn, viewsController.postsByCategory)

router.post('/search', viewsController.searchPosts)
router.post('/submit-article', viewsController.submitArticleOnPost)
router.post('/register', viewsController.signupOnSubmit)





module.exports = router;