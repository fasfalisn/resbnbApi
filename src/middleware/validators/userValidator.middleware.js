const { body, check } = require("express-validator");

exports.createUserSchema = [
  check("Name")
    .exists()
    .withMessage("Name is required")
    .isLength({ min: 3 })
    .withMessage("Must be between 3-20 chars long")
    .isLength({ max: 25}),
  check("email")
    .exists()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Must be a valid email")
    .normalizeEmail(),
  check("password")
    .exists()
    .withMessage("Password is required")
    .notEmpty()
    .isLength({ min: 8 })
    .withMessage("Password must contain at least 6 characters")
    .isLength({ max: 32 })
    .withMessage("Password can contain max 10 characters"),
  check("confirm_password")
    .exists()
    .custom((value, { req }) => value === req.body.password)
    .withMessage(
      "confirm_password field must have the same value as the password field"
    ),
];

exports.updateUserSchema = [
  check("Name")
    .optional()
    .isLength({ min: 3 })
    .withMessage("Must be between 3-20 chars long")
    .isLength({ max: 25}),
  check("email")
    .optional()
    .isEmail()
    .withMessage("Must be a valid email")
    .normalizeEmail(),
  check("password")
    .optional()
    .notEmpty()
    .isLength({ min: 8 })
    .withMessage("Password must contain at least 8 characters")
    .isLength({ max: 32 })
    .withMessage("Password can contain max 32 characters")
    .custom((value, { req }) => !!req.body.confirm_password)
    .withMessage("Please confirm your password"),
  check("confirm_password")
    .optional()
    .custom((value, { req }) => value === req.body.password)
    .withMessage(
      "confirm_password field must have the same value as the password field"
    ),
  body()
    .custom((value) => {
      return !!Object.keys(value).length;
    })
    .withMessage("Please provide required field to update")
    .custom((value) => {
      const updates = Object.keys(value);
      const allowUpdates = [
        "Name",
        "password",
        "confirm_password",
        "email",
      ];
      return updates.every((update) => allowUpdates.includes(update));
    })
    .withMessage("Invalid updates!"),
];

exports.validateLogin = [
  check("email")
    .exists()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Must be a valid email")
    .normalizeEmail(),
  check("password")
    .exists()
    .withMessage("Password is required")
    .notEmpty()
    .withMessage("Password must be filled"),
];
