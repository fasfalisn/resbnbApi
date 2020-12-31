const { body, check } = require('express-validator');
const Role = require('../../utils/userRoles.utils');



exports.createOfferSchema = [
    check('startDate')
        .exists()
        .withMessage('The date that the offer starts is required.')
        .isDate(),
    check('endDate')
        .exists()
        .withMessage('The date that the offer ends is required.')
        .isDate(),
    check('description')
        .exists()
        .withMessage('Please provide a description for the offer.')
        .isLength({ max: 350 })
        .withMessage('Must not exceed 350 chars!')       
];


exports.updateOfferSchema = [
    check('startDate')
        .optional()
        .exists()
        .withMessage('The date that the offer starts is required.')
        .isDate(),
    check('endDate')
        .optional()
        .exists()
        .withMessage('The date that the offer ends is required.')
        .isDate(),
    check('description')
        .optional()
        .exists()
        .withMessage('Please provide a description for the offer.')
        .isLength({ max: 350 })
        .withMessage('Must not exceed 350 chars!')       
];

