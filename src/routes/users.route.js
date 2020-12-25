const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');


// GET /feed/posts
router.get('/', awaitHandlerFactory(usersController.getAllUsers));
// GET /feed/posts
router.get('/:id', awaitHandlerFactory(usersController.getUserById));

// POST /feed/post
// router.post('/', usersController.createPost);

module.exports = router;