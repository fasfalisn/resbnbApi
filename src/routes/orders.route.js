const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/orders.controller');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');
const { createOrderSchema, updateOrderSchema } = require('../middleware/validators/orderValidator.middleware');



router.get('/', awaitHandlerFactory(ordersController.getAllOrders));

router.get('/:id', awaitHandlerFactory(ordersController.getOrderById));

router.post('/', createOrderSchema, awaitHandlerFactory(ordersController.createOrder));

router.put('/res/:resid/item/:itemid', updateOrderSchema, awaitHandlerFactory(ordersController.updateOrder));


module.exports = router;