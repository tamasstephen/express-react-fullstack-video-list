import { userRouter } from "./routes/user";
import cookieParser from "cookie-parser";
import express from "express";
import morgan from "morgan";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api", userRouter);

app.get("/", (req, res) => {
  res.send("Hello world!");
});

export default app;
