const express = require('express');
const router = express.Router();
const reservationsController = require('../controllers/reservations.controller');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');
const { createReservationSchema, updateReservationSchema } = require('../middleware/validators/reservationValidator.middleware');


router.get('/', awaitHandlerFactory(reservationsController.getAllReservations));

router.get('/:id', awaitHandlerFactory(reservationsController.getReservationById));

router.get('/user/:userid', awaitHandlerFactory(reservationsController.getReservationsByUserId));

router.post('/', createReservationSchema, awaitHandlerFactory(reservationsController.createReservation));

router.put('/:id', updateReservationSchema. awaitHandlerFactory(reservationsController.updateReservation));


module.exports = router;