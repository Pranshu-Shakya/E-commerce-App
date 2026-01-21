import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import nodemailer from "nodemailer";
import { sendOtpHtmlTemplate } from "../constants.js";
import { v2 as cloudinary } from "cloudinary";

const generateAccessAndRefreshToken = async (userId) => {
	try {
		const user = await User.findById(userId);
		const accessToken = user.generateAccessToken();
		const refreshToken = user.generateRefreshToken();

		user.refreshToken = refreshToken;
		await user.save({ validateBeforeSave: false });

		return { accessToken, refreshToken };
	} catch (error) {
		console.log(error);
		throw new Error("Error generating access and refresh tokens");
	}
};

// Login a user
const loginUser = async (req, res) => {
	try {
		const { email, password } = req.body;

		if ([email, password].some((field) => field?.trim() === "")) {
			return res.status(400).json({ success: false, message: "Please fill all the fields" });
		}

		// Check if user exists
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(400).json({ success: false, message: "User does not exist" });
		}

		// Check if password is correct
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(400).json({ success: false, message: "Invalid credentials" });
		}

		const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);
		const options = {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "lax",
		};

		const userWithoutSensitiveData = await User.findById(user._id).select(
			"-password -otp -otpExpiry -refreshToken"
		);

		return res
			.cookie("refreshToken", refreshToken, options)
			.cookie("accessToken", accessToken, options)
			.status(200)
			.json({
				success: true,
				message: "User logged in successfully",
				accessToken,
				refreshToken,
				user: userWithoutSensitiveData,
			});
	} catch (error) {
		console.log(error);
		res.status(500).json({ success: false, message: error.message });
	}
};

// Register a new user
const registerUser = async (req, res) => {
	try {
		const { name, email, password } = req.body;

		// Validate input
		if ([name, email, password].some((field) => field?.trim() === "")) {
			return res.status(400).json({ success: false, message: "Please fill all the fields" });
		}

		// Check if user already exists
		const exists = await User.findOne({ email });
		if (exists) {
			return res.status(400).json({ success: false, message: "User already exists" });
		}

		//validating email format and strong password
		if (!validator.isEmail(email)) {
			return res.status(400).json({ success: false, message: "Please enter a vlid email" });
		}
		// if(!validator.isStrongPassword(password)) {
		//     return res.status(400).json({ success: false, message: 'Please enter a strong password' });
		// }
		if (password.length < 5) {
			return res
				.status(400)
				.json({ success: false, message: "Password must be at least 5 characters long" });
		}

		//hashing password
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const newUser = new User({
			name,
			email,
			password: hashedPassword,
		});

		const user = await newUser.save();

		const createdUser = await User.findById(user._id).select(
			"-password -otp -otpExpiry -refreshToken"
		);

		if (!createdUser) {
			return res.status(400).json({ success: false, message: "User creation failed" });
		}

		const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);

		const options = {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "lax",
		};

		return res
			.cookie("refreshToken", refreshToken, options)
			.cookie("accessToken", accessToken, options)
			.status(201)
			.json({
				success: true,
				accessToken,
				refreshToken,
				user: createdUser,
				message: "User registered successfully",
			});
	} catch (error) {
		console.log(error);
		res.status(500).json({ success: false, message: error.message });
	}
};

// Logout user
const logoutUser = async (req, res) => {
	try {
		const { refreshToken } = req.cookies;
		if (!refreshToken) {
			return res.status(400).json({ success: false, message: "No refresh token provided" });
		}
		const user = await User.findOne({ refreshToken });
		if (!user) {
			return res.status(400).json({ success: false, message: "User not found" });
		}
		user.refreshToken = "";
		await user.save({ validateBeforeSave: false });
		return res
			.clearCookie("refreshToken")
			.clearCookie("accessToken")
			.status(200)
			.json({ success: true, message: "User logged out successfully" });
	} catch (error) {
		console.log(error);
		res.status(500).json({ success: false, message: error.message });
	}
};

// user profile
const getUserProfile = async (req, res) => {
	try {
		if (!req.user) {
			return res.status(401).json({ success: false, message: "Unauthorized" });
		}
		// Remove sensitive fields if needed
		const { password, otp, otpExpiry, refreshToken, ...safeUser } = req.user.toObject
			? req.user.toObject()
			: req.user;

		return res
			.status(200)
			.json({ success: true, user: safeUser, message: "User profile fetched successfully" });
	} catch (error) {
		console.log(error);
		res.status(500).json({ success: false, message: error.message });
	}
};

// get current user data
const getCurrentUserData = async (req, res) => {
	try {
		if (!req.user) {
			return res.status(401).json({ success: false, message: "Unauthorized" });
		}
		const user = await User.findById(req.user._id).select(
			"-password -otp -otpExpiry -refreshToken"
		);
		if (!user) {
			return res.status(404).json({ success: false, message: "User not found" });
		}
		return res
			.status(200)
			.json({ success: true, user, message: "User data fetched successfully" });
	} catch (error) {
		console.log(error);
		res.status(500).json({ success: false, message: error.message });
	}
};

// update user profile
const updateUserProfile = async (req, res) => {
	try {
		const { name, email, phone, address, profilePicture } = req.body;

		if (!name || !email) {
			return res
				.status(400)
				.json({ success: false, message: "Name and email are required" });
		}

		// Validate email format
		if (!validator.isEmail(email)) {
			return res.status(400).json({ success: false, message: "Please enter a valid email" });
		}

		const user = await User.findById(req.user._id);
		if (!user) {
			return res.status(404).json({ success: false, message: "User not found" });
		}

		user.name = name;
		user.email = email;
		user.phone = phone || user.phone;
		user.address = address || user.address;

		if (profilePicture) {
			// Upload new profile picture to Cloudinary
			try {
				const result = await cloudinary.uploader.upload(profilePicture, {
					folder: "profile_pictures",
					resource_type: "image",
				});
                user.profilePicture = result.secure_url;
			} catch (error) {
				console.log(error);
				res.status(500).json({
					success: false,
					message: "Failed to upload profile picture",
				});
			}

		}

		await user.save();

		return res.status(200).json({ success: true, message: "Profile updated successfully" });
	} catch (error) {
		console.log(error);
		res.status(500).json({ success: false, message: error.message });
	}
};

// change password
const changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {
            return res.status(400).json({ success: false, message: "Please fill all the fields" });
        }

        if (newPassword.length < 5) {
            return res.status(400).json({
                success: false,
                message: "New password must be at least 5 characters long",
            });
        }

        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Current password is incorrect" });
        }

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        await user.save();

        return res.status(200).json({ success: true, message: "Password changed successfully" });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

// send otp to user email
const sendOtpToEmail = async (req, res) => {
	try {
		const { email } = req.body;
		if (!email) {
			return res.status(400).json({ success: false, message: "Please provide an email" });
		}

		const user = await User.findOne({ email });
		if (!user) {
			return res.status(404).json({ success: false, message: "User not found" });
		}

		// Generate OTP and set expiry
		user.otp = Math.floor(100000 + Math.random() * 900000).toString();
		user.otpExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes expiry
		await user.save({ validateBeforeSave: false });

		const transporter = nodemailer.createTransport({
			host: "smtp-relay.brevo.com",
			port: 587,
			auth: {
				user: process.env.SMTP_USER,
				pass: process.env.SMTP_PASSWORD,
			},
		});

		const year = new Date().getFullYear();
		const htmlTemplate = sendOtpHtmlTemplate
			.replace("{{OTP}}", user.otp)
			.replace("{{YEAR}}", year);

		const mailOptions = {
			from: `${process.env.SENDER_NAME} <${process.env.SENDER_EMAIL}>`,
			to: email,
			subject: "OTP for Email Verification",
			text: `Your OTP for email verification is ${user.otp}. It is valid for 10 minutes.`,
			html: htmlTemplate,
		};

		const info = await transporter.sendMail(mailOptions);
		if (!info) {
			return res.status(500).json({ success: false, message: "Failed to send OTP" });
		}

		return res.status(200).json({ success: true, message: "OTP sent to email" });
	} catch (error) {
		console.log(error);
		res.status(500).json({ success: false, message: error.message });
	}
};

// verify otp
const verifyOtp = async (req, res) => {
	try {
		const { email, otp } = req.body;
		if (!email || !otp) {
			return res
				.status(400)
				.json({ success: false, message: "Please provide email and OTP" });
		}

		const user = await User.findOne({ email });
		if (!user) {
			return res.status(404).json({ success: false, message: "User not found" });
		}

		if (user.otp !== otp) {
			return res.status(400).json({ success: false, message: "Invalid OTP" });
		}

		if (user.otpExpiry < Date.now()) {
			return res.status(400).json({ success: false, message: "OTP expired" });
		}

		user.otp = undefined;
		user.otpExpiry = undefined;
		await user.save({ validateBeforeSave: false });

		return res.status(200).json({ success: true, message: "OTP verified successfully" });
	} catch (error) {
		console.log(error);
		res.status(500).json({ success: false, message: error.message });
	}
};

// admin login
const adminLogin = async (req, res) => {
	try {
		const { email, password } = req.body;
		if (!email || !password) {
			return res.status(400).json({ success: false, message: "Please fill all the fields" });
		}

		if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
			const token = jwt.sign(email + password, process.env.ACCESS_TOKEN_SECRET);
			res.status(200).json({ success: true, token });
		} else {
			res.status(400).json({ success: false, message: "Invalid credentials" });
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ success: false, message: error.message });
	}
};

export {
	loginUser,
	registerUser,
	adminLogin,
	logoutUser,
	sendOtpToEmail,
	verifyOtp,
	getUserProfile,
	getCurrentUserData,
	updateUserProfile,
	changePassword
};
