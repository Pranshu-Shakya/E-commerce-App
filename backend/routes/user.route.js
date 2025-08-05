import express from 'express';
import multer from 'multer';
import { registerUser, loginUser, adminLogin, logoutUser, sendOtpToEmail, verifyOtp } from '../controllers/user.controller.js';

const userRouter = express.Router();
const upload = multer();

userRouter.post('/register', upload.none(), registerUser);
userRouter.post('/login', upload.none(), loginUser);
userRouter.post('/logout', upload.none(), logoutUser);

userRouter.post('/send-otp', upload.none(), sendOtpToEmail);
userRouter.post('/verify-otp', upload.none(), verifyOtp);

userRouter.post('/admin', upload.none(), adminLogin);

export default userRouter;