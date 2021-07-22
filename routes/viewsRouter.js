const express = require('express');
const viewsController = require('./../controllers/viewsController');
const router = express.Router();

router.get('/', viewsController.index)
router.get('/:slug', viewsController.getPost)

module.exports = router;