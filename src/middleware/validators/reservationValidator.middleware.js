const { body, check } = require('express-validator');
const Role = require('../../utils/userRoles.utils');


exports.createReservationSchema = [
    check('numguests')
        .exists()
        .withMessage('Please provide the number of guests.')
        .isInt(),
    check('date')
        .exists()
        .withMessage('The reservation date is required.')
        .isDate()
];

exports.updateReservationSchema = [
    check('numguests')
        .optional()
        .exists()
        .withMessage('Please provide the number of guests.')
        .isInt(),
    check('date')
        .optional()
        .exists()
        .withMessage('The reservation date is required.')
        .isDate()
];