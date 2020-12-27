const express = require('express');
const router = express.Router();
const userRatesHouseController = require('../controllers/userrateshouse.controller');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');


// GET /feed/posts
router.get('/', awaitHandlerFactory(userRatesHouseController.getAllRatings));
// GET /feed/posts
router.get('/house/:id', awaitHandlerFactory(userRatesHouseController.getRatingByHouseId));

router.get('/user/:id', awaitHandlerFactory(userRatesHouseController.getRatingByUserId));

// POST /feed/post
// router.post('/', usersController.createPost);

module.exports = router;