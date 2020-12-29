const express = require('express');
const router = express.Router();
const userhasoffersController = require('../controllers/userhasoffers.controller');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');


// GET /feed/posts
router.get('/', awaitHandlerFactory(userhasoffersController.getAllOffers));
// GET /feed/posts
router.get('/user/:id', awaitHandlerFactory(userhasoffersController.getOffersByUserId));

// POST /feed/post
// router.post('/', offersController.createPost);

module.exports = router;