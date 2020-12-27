const express = require('express');
const router = express.Router();
const offersController = require('../controllers/offers.controller');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');


// GET /feed/posts
router.get('/', awaitHandlerFactory(offersController.getAllOffers));
// GET /feed/posts
router.get('/:id', awaitHandlerFactory(offersController.getOfferById));

// POST /feed/post
// router.post('/', offersController.createPost);

module.exports = router;