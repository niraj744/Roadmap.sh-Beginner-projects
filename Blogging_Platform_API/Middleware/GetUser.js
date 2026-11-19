import AsyncHandler from "../Utils/Asynhandler.js";
import jwt from "jsonwebtoken";
import CustomError from "../Utils/CustomError.js";
import User from "../Db/User.db.js";

const GetUser = AsyncHandler(async (req, res, next) => {
  const token = req.cookies.token;
  const { id } = jwt.verify(token, process.env.SECRET_KEY);
  if (!id) throw new CustomError("Invalid token (token may be expired)", 400);
  const user = await User.findById(id);
  if (!user) throw new CustomError("User does not exists", 400);
  const { password, ...other } = user._doc;
  req.user = other;
  next();
});

export default GetUser;
