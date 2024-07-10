import express from "express";
import dotenv from "dotenv";
import connectDB from "./utils/connectDB.js";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import { verifyUserAuthentication } from "./middlewares/auth.middleware.js";
import cors from "cors";
import filmRouter from "./routes/film.route.js";
import searchRouter from "./routes/search.route.js";

dotenv.config();

const app = express();
app.use(
  cors({
    origin: `${process.env.CLIENT_URL}:${process.env.CLIENT_PORT}`,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: [
      "Origin",
      "X-Requested-With",
      "Content-Type",
      "Authorization",
    ],
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/v1/auth", authRouter);

app.use(verifyUserAuthentication);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/film", filmRouter);
app.use("/api/v1/search", searchRouter);

connectDB().then(() => {
  app
    .listen(process.env.SERVER_PORT, () => {
      console.log(
        `Server is running on ${process.env.SERVER_URL}:${process.env.SERVER_PORT}`
      );
    })
    .on("error", (err) => {
      console.error("Failed to start server:", err);
    });
});
