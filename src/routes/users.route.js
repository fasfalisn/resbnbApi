const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const usersController = require('../controllers/users.controller');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');
const { validateLogin, createUserSchema,updateUserSchema } = require('../middleware/validators/userValidator.middleware');


// GET 
router.get('/', awaitHandlerFactory(usersController.getAllUsers));
// GET 
router.get('/:id', auth(), awaitHandlerFactory(usersController.getUserById));

router.put('/:id', createUserSchema, awaitHandlerFactory(usersController.updateUser));

router.post('/', updateUserSchema, awaitHandlerFactory(usersController.createUser));

router.post('/login', validateLogin, awaitHandlerFactory(usersController.userLogin));

module.exports = router;