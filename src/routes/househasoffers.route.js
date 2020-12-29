const express = require('express');
const router = express.Router();
const househasoffersController = require('../controllers/househasoffers.controller');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');


// GET /feed/posts
router.get('/', awaitHandlerFactory(househasoffersController.getAllHouses));
// GET /feed/posts
// router.get('/:id', awaitHandlerFactory(househasoffersController.getHouseById));


module.exports = router;