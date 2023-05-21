import { userRouter } from "./routes/user";
import cors from "cors";
import type { Request } from "express";
import express from "express";
import morgan from "morgan";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", userRouter);

app.get("/", (req, res) => {
  res.send("Hello world!");
});

export default app;
