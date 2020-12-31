const express = require('express');
const router = express.Router();
const itemsController = require('../controllers/items.controller');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');
const { createItemSchema, updateItemSchema } = require('../middleware/validators/itemValidator.middleware');


// GET all
router.get('/', awaitHandlerFactory(itemsController.getAllItems));
// GET 
router.get('/house/:id', awaitHandlerFactory(itemsController.getItemsByHouseId));

// post request
router.post('/', createItemSchema, awaitHandlerFactory(itemsController.createItem));

//put request
router.put('/house/:id', updateItemSchema, awaitHandlerFactory(itemsController.updateItem));

//delete request
router.delete('/house/:id', awaitHandlerFactory(itemsController.deleteItem));

module.exports = router;