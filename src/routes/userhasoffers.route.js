const express = require('express');
const router = express.Router();
const userhasoffersController = require('../controllers/userhasoffers.controller');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');



router.get('/', awaitHandlerFactory(userhasoffersController.getAllOffers));

router.get('/user/:id', awaitHandlerFactory(userhasoffersController.getOffersByUserId));



module.exports = router;