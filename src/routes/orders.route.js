const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/orders.controller');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');


// GET /feed/posts
router.get('/', awaitHandlerFactory(ordersController.getAllOrders));
// GET /feed/posts
router.get('/:id', awaitHandlerFactory(ordersController.getOrderById));

router.post('/', awaitHandlerFactory(ordersController.createOrder));

router.put('/res/:resid/item/:itemid', awaitHandlerFactory(ordersController.updateOrder));
// POST /feed/post
// router.post('/', usersController.createPost);

module.exports = router;