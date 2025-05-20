import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// Define the schema
const userSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
			trim: true,
		},
		password: {
			type: String,
			required: [true, "Password is required"],
		},
		role: {
			type: String,
			enum: ["user", "admin"],
			default: "user",
		},
		refreshToken: {
			type: String,
		},
		emailVerified: {
			type: Boolean,
			default: false,
		},
		otp: {
			type: String,
		},
		otpExpires: {
			type: Date,
		}
	},
	{
		timestamps: true, // ✅ Adds createdAt and updatedAt fields
	}
);

// Pre-save hook to hash password
userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) return next();
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
	next();
});

// Method to compare password
userSchema.methods.isPasswordCorrect = async function (password) {
	return await bcrypt.compare(password, this.password);
};

// Method to generate access token
userSchema.methods.generateAccessToken = function () {
	return jwt.sign(
		{
			_id: this._id,
			email: this.email,
		},
		process.env.ACCESS_TOKEN_SECRET,
		{
			expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
		}
	);
};

// Method to generate refresh token
userSchema.methods.generateRefreshToken = function () {
	return jwt.sign(
		{
			_id: this._id,
			email: this.email,
		},
		process.env.REFRESH_TOKEN_SECRET,
		{
			expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
		}
	);
};

// Optional method to return public user data without password/refreshToken
userSchema.methods.toPublic = function () {
	const userObject = this.toObject();
	delete userObject.password;
	delete userObject.refreshToken;
	return userObject;
};

// Export the model
export const User = mongoose.model("User", userSchema);
