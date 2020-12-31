const { body, check } = require('express-validator');
const Role = require('../../utils/userRoles.utils');


exports.createItemSchema = [
    check('type')
        .exists()
        .withMessage('The type of the item is required.')
        .isIn(['Food', 'Drink'])
        .withMessage('Invalid Item type!'),
    check('description')
        .exists()
        .withMessage('Please provide a description for the item.')
        .isLength({ max: 350 })
        .withMessage('Must not exceed 350 chars!'),
    check('name')
        .exists()
        .withMessage('Please give a name for the item.')
        .isLength({ max: 32 })
        .withMessage('Must not exceed 32 chars!'),
    check('price')
        .exists()
        .withMessage('Please provide a price for the item.')
        .isDecimal(6,2) // check if this command indeed sets upper bound 
];


exports.updateItemSchema = [
    check('type')
        .optional()
        .exists()
        .withMessage('The type of the item is required.')
        .isIn(['Food', 'Drink'])
        .withMessage('Invalid Item type!'),
    check('description')
        .optional()
        .exists()
        .withMessage('Please provide a description for the item.')
        .isLength({ max: 350 })
        .withMessage('Must not exceed 350 chars!'),
    check('name')
        .optional()
        .exists()
        .withMessage('Please give a name for the item.')
        .isLength({ max: 32 })
        .withMessage('Must not exceed 32 chars!'),
    check('price')
        .optional()
        .exists()
        .withMessage('Please provide a price for the item.')
        .isDecimal(6,2) // check if this command indeed sets upper bound 
];