import express from 'express';
import { registerUser, loginUser, logoutUser, getUserProfile } from '../controller/auth.controller.js';
import { authUser } from '../middlewares/auth.middleware.js';

const authRouter = express.Router();

authRouter.post('/register', registerUser);
authRouter.post('/login', loginUser);
authRouter.get('/logout', logoutUser);

authRouter.get('/profile',authUser, getUserProfile);

export default authRouter;