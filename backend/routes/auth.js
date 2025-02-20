import { getAllUsers, login, logout, register, setAvatar } from "../controllers/userController.js";
import express from 'express';

export const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.get('/users', getAllUsers);
router.get('/avatar/:id', setAvatar);
router.get('/logout/:id', logout);
