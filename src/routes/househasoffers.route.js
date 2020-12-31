const express = require('express');
const router = express.Router();
const houseHasOffersController = require('../controllers/househasoffers.controller');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');


// GET 
router.get('/', awaitHandlerFactory(houseHasOffersController.getAllHouses));


module.exports = router;