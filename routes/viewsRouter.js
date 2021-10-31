const express = require('express');
const viewsController = require('./../controllers/viewsController');
const authController = require('./../controllers/authController')
const router = express.Router();

router.use(authController.isLoggedIn);

router.get('/', viewsController.index)
router.get('/submit-article', viewsController.submitArticle)
router.get('/:slug', viewsController.singlePost)
router.get('/category/:name', viewsController.postsByCategory)
router.post('/search', viewsController.searchPosts)



router.get('/login', viewsController.login)
router.get('/register', viewsController.signup)

module.exports = router;