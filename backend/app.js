import express from "express";
import cors from "cors";
import { router as authRoutes } from "./routes/auth.js";
import morgan from "morgan";

export const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));
// app.use(morgan("combined"));

app.use("/api/auth", authRoutes);

