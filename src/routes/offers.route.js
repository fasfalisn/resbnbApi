const express = require('express');
const router = express.Router();
const offersController = require('../controllers/offers.controller');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');


// GET all
router.get('/', awaitHandlerFactory(offersController.getAllOffers));
// GET one
router.get('/:id', awaitHandlerFactory(offersController.getOfferById));


module.exports = router;