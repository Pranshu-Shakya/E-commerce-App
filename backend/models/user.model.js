import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		profilePicture: {
			type: String,
			default: "",
		},
		cartData: {
			type: Object,
			default: {},
		},
		address: {
			type: Object,
			default: {
                colony: "",
                state: "",
                country: "India",
            },
		},
		phone: {
			type: String,
			default: "",
		},
		otp: {
			type: String,
			default: "",
		},
		otpExpiry: {
			type: Date,
			default: null,
		},
		isEmailVerified: {
			type: Boolean,
			default: false,
		},
        refreshToken: {
            type: String,
            default: "",
        }
	},
	{ minimize: false, timestamps: true }
);

userSchema.methods.generateAccessToken = function () {
	return jwt.sign(
		{
			_id: this._id,
			email: this.email,
			name: this.name,
		},
		process.env.ACCESS_TOKEN_SECRET,
		{
			expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
		}
	);
};
userSchema.methods.generateRefreshToken = function () {
	return jwt.sign(
		{
			_id: this._id,
		},
		process.env.REFRESH_TOKEN_SECRET,
		{
			expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
		}
	);
};

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
