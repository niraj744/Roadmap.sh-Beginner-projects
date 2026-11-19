import express from "express";
import "dotenv/config.js";
import Connection from "./Utils/Connection.js";
import cors from "cors";
import { rateLimit } from "express-rate-limit";
import cookieParser from "cookie-parser";
import CustomError from "./Utils/CustomError.js";
import ErrorMiddleware from "./Middleware/Error.js";
import RoutesWrapper from "./Utils/RoutesWrapper.js";

const app = express();

app.use(
  cors({
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  ipv6Subnet: 56,
});
app.use(limiter);
app.use(RoutesWrapper);
const PORT = process.env.PORT || 8000;

app.use((req, res, next) => {
  const error = new CustomError("Page not found", 404);
  next(error);
});
app.use(ErrorMiddleware);

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
  Connection(process.env.DB_URL);
});
