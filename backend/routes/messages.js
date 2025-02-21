import express from "express";
import { getMessages } from "../controllers/messageController";

export const router = express.Router();

router.post('/messages', getMessages);
