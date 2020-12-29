const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');


// GET /feed/posts
router.get('/', awaitHandlerFactory(usersController.getAllUsers));
// GET /feed/posts
router.get('/:id', awaitHandlerFactory(usersController.getUserById));

router.patch('/:id', awaitHandlerFactory(usersController.updateUser));

router.post('/', awaitHandlerFactory(usersController.createUser));

router.post('/login', awaitHandlerFactory(usersController.userLogin));

module.exports = router;