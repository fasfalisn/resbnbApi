const { body, check } = require('express-validator');
const Role = require('../../utils/userRoles.utils');


exports.createUserMessagesSchema = [
    check('text')
        .exists()
        .withMessage('Please provide a text message.')
        .isLength({ max: 350 })
        .withMessage('Must not exceed 350 chars!'),
    check('date') // should be automated by system and not given as user input
        .exists()
        .withMessage('The rating date is required.')
        .isDate()
];

//update is not available.