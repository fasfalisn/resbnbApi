const express = require('express');
const router = express.Router();
const userMessagesController = require('../controllers/usermessages.controller');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');


// GET /feed/posts
router.get('/', awaitHandlerFactory(userMessagesController.getAllUserMessages));
// GET /feed/posts
router.get('/:id', awaitHandlerFactory(userMessagesController.getUserMessageById));

router.get('/user/:id', awaitHandlerFactory(userMessagesController.getOnesUserMessages));

router.get('/user/:sender/:receiver', awaitHandlerFactory(userMessagesController.getOnesUserMessagesWithOne));

router.post('/', awaitHandlerFactory(userMessagesController.createMessage));

// POST /feed/post
// router.post('/', usersController.createPost);

module.exports = router;