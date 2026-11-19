import jwt from "jsonwebtoken";

const generateJWTtoken = ({ id, res }) => {
  const token = jwt.sign({ id }, process.env.SECRET_KEY, {
    expiresIn: "7d",
  });
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

export { generateJWTtoken };
