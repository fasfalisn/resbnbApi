const express = require('express');
const router = express.Router();
const hostsController = require('../controllers/hosts.controller');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');



router.post('/', awaitHandlerFactory(hostsController.createHost));

router.delete('/:id', awaitHandlerFactory(hostsController.deleteHost));


module.exports = router; 