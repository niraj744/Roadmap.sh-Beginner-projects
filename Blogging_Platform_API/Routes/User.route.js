import { Router } from "express";
import AsyncHandler from "../Utils/Asynhandler.js";
import UserController from "../Controller/User.controller.js";
import Rules from "../Utils/Validator.js";

const User = Router();

User.post(
  "/create",
  Rules.SignUpRules(),
  Rules.validate,
  AsyncHandler(UserController.create),
);
User.post(
  "/login",
  Rules.SignUpRules(),
  Rules.validate,
  AsyncHandler(UserController.login),
);

export default User;
