import mongoose from "mongoose";
import dotenv from "dotenv";
import { app } from "./app.js";

dotenv.config({
  path: "./.env",
});

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Mongodb connected"))
  .catch((err) => console.error(err));

const server = app.listen(process.env.PORT, () => {
  console.log(
    `Server is running on Port: ${`http://127.0.0.1:${process.env.PORT}`} `
  );
});

console.log("executed server file")

