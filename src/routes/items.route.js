const express = require('express');
const router = express.Router();
const itemsController = require('../controllers/items.controller');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');


// GET /feed/posts
router.get('/', awaitHandlerFactory(itemsController.getAllItems));
// GET /feed/posts
router.get('/house/:id', awaitHandlerFactory(itemsController.getItemsByHouseId));
// POST /feed/post
// router.post('/', usersController.createPost);

module.exports = router;