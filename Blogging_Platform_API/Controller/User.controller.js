import CustomError from "../Utils/CustomError.js";
import User from "../Db/User.db.js";
import bcrypt from "bcrypt";
import { generateJWTtoken } from "../Utils/GenerateToken.js";

const create = async (req, res) => {
  const { username, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  const create = await User.create({
    username,
    password: hashPassword,
  });
  res.json({ create, message: "Successfully created new user." });
};
const login = async (req, res) => {
  const { username, password } = req.body;
  const isExists = await User.findOne({ username });
  if (!isExists)
    throw new CustomError(
      `${username} username does't exists kindly Sign Up first.`,
    );
  const dcryptedPassword = await bcrypt.compare(password, isExists.password);
  if (username !== isExists.username || !dcryptedPassword)
    throw new CustomError("Invalid credentials.");
  generateJWTtoken({ id: isExists._id, res });
  const { password: hashpassword, ...others } = isExists._doc;
  res.json({ user: others, message: "Successfully login." });
};

const controller = {
  create,
  login,
};

export default controller;
