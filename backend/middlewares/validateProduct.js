const { body } = require("express-validator");

const validateProduct = [
  body("title")
    .notEmpty().withMessage("Title is required")
    .isString().withMessage("Title must be a string"),

  body("price")
    .notEmpty().withMessage("Price is required")
    .isNumeric().withMessage("Price must be a number"),

  body("description")
    .optional()
    .isString().withMessage("Description must be a string"),

  body("category")
    .notEmpty().withMessage("Category is required")
    .isString().withMessage("Category must be a string"),

  body("subcategory")
    .optional()
    .isString().withMessage("Subcategory must be a string"),

  body("imgs")
    .isArray({ min: 1 }).withMessage("Images must be a non-empty array"),

  body("colorsAndSizes")
    .optional()
    .isArray().withMessage("Colors and sizes must be an array"),

  body("discount")
    .optional()
    .isNumeric().withMessage("Discount must be a number"),

  body("quantity")
    .notEmpty().withMessage("Quantity is required")
    .isInt({ min: 0 }).withMessage("Quantity must be a non-negative integer"),

  body("tags")
    .isArray({ min: 1 }).withMessage("Tags must be a non-empty array"),

  body("rate")
    .optional()
    .isNumeric().withMessage("Rate must be a number")
    .isFloat({ min: 0, max: 5 }).withMessage("Rate must be between 0 and 5"),
];

module.exports = validateProduct;
