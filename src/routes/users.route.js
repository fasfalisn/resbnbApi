const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');
const { validateLogin } = require('../middleware/validators/userValidator.middleware');


// GET /feed/posts
router.get('/', awaitHandlerFactory(usersController.getAllUsers));
// GET /feed/posts
router.get('/:id', awaitHandlerFactory(usersController.getUserById));

router.put('/:id', awaitHandlerFactory(usersController.updateUser));

router.post('/', awaitHandlerFactory(usersController.createUser));

router.post('/login', validateLogin, awaitHandlerFactory(usersController.userLogin));

module.exports = router;