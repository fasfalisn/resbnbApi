const express = require('express');
const router = express.Router();
const housesController = require('../controllers/houses.controller');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');
const { createHouseSchema, updateHouseSchema } = require('../middleware/validators/houseValidator.middleware');


// GET all
router.get('/', awaitHandlerFactory(housesController.getAllHouses));
// GET one
router.get('/:id', awaitHandlerFactory(housesController.getHouseById));

router.get('/city/:city', awaitHandlerFactory(housesController.getHousesByCity));

router.get('/host/:id', awaitHandlerFactory(housesController.getHousesByHostId));

router.post('/', createHouseSchema,awaitHandlerFactory(housesController.createHouse));

router.put('/:id', updateHouseSchema,awaitHandlerFactory(housesController.updateHouse));

router.delete('/:id', awaitHandlerFactory(housesController.deleteHouse));

module.exports = router;