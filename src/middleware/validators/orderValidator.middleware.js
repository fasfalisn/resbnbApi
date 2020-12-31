const { body, check } = require('express-validator');
const Role = require('../../utils/userRoles.utils');



exports.createOrderSchema = [
    check('resid')
        .exists()
        .withMessage('The reservation id is required.')
        .isInt()
        .withMessage('Invalid id type!'),
    check('itemid')
        .exists()
        .withMessage('The item id is required.')
        .isInt()
        .withMessage('Invalid id type!'),
    check('quantity')
        .exists()
        .withMessage('The quantity of the selected item is required.')
        .isInt(),
];


exports.updateOrderSchema = [
    check('resid')
        .optional()
        .exists()
        .withMessage('The reservation id is required.')
        .isInt()
        .withMessage('Invalid id type!'),
    check('itemid')
        .optional()
        .exists()
        .withMessage('The item id is required.')
        .isInt()
        .withMessage('Invalid id type!'),
    check('quantity')
        .optional()
        .exists()
        .withMessage('The quantity of the selected item is required.')
        .isInt(),
];