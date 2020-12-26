const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/orders.controller');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');


// GET /feed/posts
router.get('/', awaitHandlerFactory(ordersController.getAllOrders));
// GET /feed/posts
router.get('/:id', awaitHandlerFactory(ordersController.getOrderById));

// POST /feed/post
// router.post('/', usersController.createPost);

module.exports = router;