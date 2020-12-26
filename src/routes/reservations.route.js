const express = require('express');
const router = express.Router();
const reservationsController = require('../controllers/reservations.controller');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');


// GET /feed/posts
router.get('/', awaitHandlerFactory(reservationsController.getAllReservations));
// GET /feed/posts
router.get('/:id', awaitHandlerFactory(reservationsController.getReservationById));

// POST /feed/post
// router.post('/', usersController.createPost);

module.exports = router;