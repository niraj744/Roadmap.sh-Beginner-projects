import { Router } from "express";
import GetUser from "../Middleware/GetUser.js";
import AsyncHandler from "../Utils/Asynhandler.js";
import controller from "../Controller/Post.controller.js";
import Rules from "../Utils/Validator.js";

const Post = Router();

Post.post(
  "/",
  GetUser,
  Rules.PostCreateRules(),
  Rules.validate,
  AsyncHandler(controller.create),
);
Post.put(
  "/update/:id",
  GetUser,
  Rules.PostCreateRules(),
  Rules.validate,
  AsyncHandler(controller.update),
);
Post.delete(
  "/delete/:id",
  GetUser,
  Rules.IdRules(),
  Rules.validate,
  AsyncHandler(controller.deletePost),
);
Post.get(
  "/getSinglePost/:id",
  GetUser,
  Rules.IdRules(),
  Rules.validate,
  AsyncHandler(controller.singlePost),
);
Post.get("/getPosts", GetUser, AsyncHandler(controller.getPosts));

export default Post;
