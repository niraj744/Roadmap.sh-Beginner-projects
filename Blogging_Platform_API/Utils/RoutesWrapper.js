import { Router } from "express";
import User from "../Routes/User.route.js";
import Post from "../Routes/Post.route.js";

const wrapper = Router();
wrapper.use("/user", User);
wrapper.use("/post", Post);

export default wrapper;
