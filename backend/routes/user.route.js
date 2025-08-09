import express from 'express';
import multer from 'multer';
import { registerUser, loginUser, adminLogin, logoutUser, sendOtpToEmail, verifyOtp, getUserProfile, getCurrentUserData, updateUserProfile, changePassword } from '../controllers/user.controller.js';
import authUser from '../midlleware/auth.js';

const userRouter = express.Router();
const upload = multer();

userRouter.post('/register', upload.none(), registerUser);
userRouter.post('/login', upload.none(), loginUser);
userRouter.post('/logout', upload.none(), logoutUser);


// Get authenticated user's profile
userRouter.get('/profile', authUser, getUserProfile);

// get user data for profile page
userRouter.get('/current', authUser, getCurrentUserData);

// Update user profile
userRouter.post('/update-profile', authUser, upload.single('profilePicture'), updateUserProfile);
userRouter.post('/change-password', authUser, changePassword);

userRouter.post('/send-otp', upload.none(), sendOtpToEmail);
userRouter.post('/verify-otp', upload.none(), verifyOtp);

userRouter.post('/admin', upload.none(), adminLogin);

export default userRouter;