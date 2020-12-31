const { body, check } = require('express-validator');
const Role = require('../../utils/userRoles.utils');


exports.createHouseSchema = [
    check('name')
        .exists()
        .withMessage('Please give a name for the house.')
        .isLength({ max: 32 })
        .withMessage('Must not exceed 32 chars!'),
    check('description')
        .exists()
        .withMessage('Please provide a description for the house.')
        .isLength({ max: 350 })
        .withMessage('Must not exceed 350 chars!'),
    check('type')
        .exists()
        .withMessage('The type of the house is required.')
        .isIn(['Bar', 'Cafe', 'Restaurant'])
        .withMessage('Invalid House type!'),
    check('street')
        .exists()
        .withMessage('Please give an address for the house.')
        .isLength({ max: 35 })
        .withMessage('Must not exceed 35 chars!'),
    check('zip')
        .exists()
        .withMessage('Please provide the house zip code.')
        .isInt(5) // can use isPostalCode() 
        .withMessage('The zip code must be 5 digits long.'),
    check('city')
        .exists()
        .withMessage('Please provide the City in which the house is located.')
        .isLength({ max: 35 })
        .withMessage('Must not exceed 35 chars!')
];

exports.updateHouseSchema = [
    check('name')
        .optional()
        .exists()
        .withMessage('Please give a name for the house.')
        .isLength({ max: 32 })
        .withMessage('Must not exceed 32 chars!'),
    check('description')
        .optional()
        .exists()
        .withMessage('Please provide a description for the house.')
        .isLength({ max: 350 })
        .withMessage('Must not exceed 350 chars!'),
    check('type')
        .optional()
        .exists()
        .withMessage('The type of the house is required.')
        .isIn(['Bar', 'Cafe', 'Restaurant'])
        .withMessage('Invalid House type!'),
    check('street')
        .optional()
        .exists()
        .withMessage('Please give an address for the house.')
        .isLength({ max: 35 })
        .withMessage('Must not exceed 35 chars!'),
    check('zip')
        .optional()
        .exists()
        .withMessage('Please provide the house zip code.')
        .isInt(5)
        .withMessage('The zip code must be 5 digits long.'),
    check('city')
        .optional()
        .exists()
        .withMessage('Please provide the City in which the house is located.')
        .isLength({ max: 35 })
        .withMessage('Must not exceed 35 chars!')
];