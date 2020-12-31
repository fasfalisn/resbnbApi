const express = require('express');
const router = express.Router();
const itemsController = require('../controllers/items.controller');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');


// GET /feed/posts
router.get('/', awaitHandlerFactory(itemsController.getAllItems));
// GET /feed/posts
router.get('/house/:id', awaitHandlerFactory(itemsController.getItemsByHouseId));

// post request
router.post('/', awaitHandlerFactory(itemsController.createItem));

//put request
router.put('/house/:id', awaitHandlerFactory(itemsController.updateItem));

//delete request
router.delete('/house/:id', awaitHandlerFactory(itemsController.deleteItem));

module.exports = router;