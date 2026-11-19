import { body, param, validationResult } from "express-validator";
import CustomError from "../Utils/CustomError.js";

const SignUpRules = () => [
  body("username")
    .notEmpty()
    .withMessage("Username is required.")
    .bail()
    .isLength({ min: 5 })
    .withMessage("Username lenght must be at least 5 characters.")
    .toLowerCase()
    .bail(),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .bail()
    .isLength({ min: 5 })
    .withMessage("Password must be at least 5 characters long")
    .bail()
    .isStrongPassword({
      minUppercase: 1,
      minNumbers: 2,
      minSymbols: 1,
    })
    .withMessage("Password must contain 1 uppercase, 2 numbers, and 1 symbols"),
];
const PostCreateRules = () => [
  param("id")
    .optional()
    .notEmpty()
    .withMessage("Id is required.")
    .bail()
    .isMongoId()
    .withMessage("Invalid mongodb id."),
  body("title")
    .notEmpty()
    .withMessage("Title is required.")
    .bail()
    .isLength({ min: 5 })
    .withMessage("Title length must be greater than 5."),
  body("content")
    .notEmpty()
    .withMessage("Content is required.")
    .bail()
    .isLength({ min: 5 })
    .withMessage("Content length must be greater than 5."),
  body("category")
    .notEmpty()
    .withMessage("Category is required.")
    .bail()
    .isLength({ min: 5 })
    .withMessage("Category length must be greater than 5."),
  body("tags")
    .isArray({ min: 2 })
    .withMessage("Tags must be an array containing 2 items"),
];
const IdRules = () => [
  param("id")
    .notEmpty()
    .withMessage("Id is required.")
    .bail()
    .isMongoId()
    .withMessage("Invalid mongodb id."),
];
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const extracted = errors
      .array()
      .map((e) => ({ field: e.param, message: e.msg }));
    return next(new CustomError(extracted, 400));
  }
  next();
};
const Rules = {
  validate,
  SignUpRules,
  PostCreateRules,
  IdRules,
};
export default Rules;
