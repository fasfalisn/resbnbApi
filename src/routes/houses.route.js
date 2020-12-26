const express = require('express');
const router = express.Router();
const housesController = require('../controllers/houses.controller');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');


// GET /feed/posts
router.get('/', awaitHandlerFactory(housesController.getAllHouses));
// GET /feed/posts
router.get('/:id', awaitHandlerFactory(housesController.getHouseById));

router.get('/city/:city', awaitHandlerFactory(housesController.getHousesByCity));

router.get('/host/:id', awaitHandlerFactory(housesController.getHousesByHostId));
// POST /feed/post
// router.post('/', usersController.createPost);

module.exports = router;