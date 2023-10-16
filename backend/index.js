import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import routes from "./routes/index.js";
import http from "http";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(
  cors({
    // credentials: true,
    // origin: "http://localhost:3000",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/v1", routes);

const server = http.createServer(app);

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Connect database");
    server.listen(port, () => {
      console.log(`listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.log({ err });
    process.exit(1);
  });
