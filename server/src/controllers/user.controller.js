import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { sendEmail } from "../utils/sendEmail.js";
import { generateEmailVerificationToken } from "../utils/emailVerificationToken.js";

const generateAccessAndRefereshTokens = async (userId) => {
	try {
		console.log("Generating tokens for userId:", userId); // Debugging log
		const user = await User.findById(userId);
		if (!user) {
			throw new Error("User not found");
		}
		console.log("User found:", user); // Debugging log

		const accessToken = user.generateAccessToken();
		const refreshToken = user.generateRefreshToken();

		user.refreshToken = refreshToken;
		await user.save({ validateBeforeSave: false });

		return { accessToken, refreshToken };
	} catch (error) {
		console.error(
			"Error in generateAccessAndRefereshTokens:",
			error.message
		); // Debugging log
		throw new ApiError(
			500,
			"Something went wrong while generating referesh and access token"
		);
	}
};

const registerUser = asyncHandler(async (req, res) => {
	const { email, name, password, role } = req.body;
	console.log("email: ", email);

	if ([email, name, password, role].some((field) => field?.trim() === "")) {
		throw new ApiError(400, "All fields are required");
	}

	if (!email.includes("@")) {
		throw new ApiError(400, "@ is required in email");
	}

	if (role) {
		if (!["admin", "user"].includes(role.toLowerCase())) {
			throw new ApiError(400, "Role must be either admin or user");
		}
	}

	const existedUser = await User.findOne({
		$or: [{ name }, { email }],
	});

	if (existedUser) {
		throw new ApiError(409, "User with email or username already exists");
	}

	// Generate OTP
	const otp = Math.floor(100000 + Math.random() * 900000).toString();
	const otpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
    
    
	const user = await User.create({
        email,
		password,
		name,
		role,
		otp,
		otpExpires,
		emailVerified: false,
	});

    //Generate verification token
    const token = generateEmailVerificationToken(user);
    const tokenExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

    user.emailVerificationToken = token
    user.emailVerificationTokenExpires = tokenExpires
	await user.save({ validateBeforeSave: false });


	const verificationUrl = `${process.env.CORS_ORIGIN}/verify-email?token=${token}`;

	// Send email with opt and verification token to user's email
	const emailBody = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <h2 style="color: #4CAF50;">Email Verification - My Blog Platform</h2>

    <p>Hi ${name},</p>

    <p>Thank you for registering with <strong>My Blog Platform</strong>.</p>

    <p>Your One-Time Password (OTP) for email verification is:</p>
    <h3 style="background: #f0f0f0; padding: 10px; display: inline-block;">${otp}</h3>

    <p>This OTP is valid for <strong>10 minutes</strong>.</p>

    <p>Alternatively, you can verify your email directly by clicking the button below:</p>

    <p>
      <a href="${verificationUrl}" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Verify Email</a>
    </p>

    <p>If you did not request this, please ignore this email.</p>

    <br/>
    <p>Best regards,<br/>The My Blog Platform Team</p>
    </div>
    `;

	await sendEmail(email, "Verify your Email - Blog Platform", emailBody);

	const createdUser = await User.findById(user._id).select(
		"-password -refreshToken"
	);

	if (!createdUser) {
		throw new ApiError(
			500,
			"Something went wrong while registering the user"
		);
	}

	return res
		.status(201)
		.json(
			new ApiResponse(200, createdUser, "User registered Successfully")
		);
});

const verifyEmail = async (req, res) => {
	const { email, otp } = req.body || {};
	const { token } = req.query;

	let user;

	// If OTP and email are provided, try OTP verification
	if (email && otp) {
		user = await User.findOne({ email });

		if (!user) {
			throw new ApiError(404, "User not found");
		}

		if (user.emailVerified) {
			return res
				.status(200)
				.json(new ApiResponse(200, null, "Email is already verified"));
		}

		if (user.otp !== otp || user.otpExpires < Date.now()) {
			throw new ApiError(400, "Invalid or expired OTP");
		}
	}

	// If token is provided (via email link), verify using token
	else if (token) {
		user = await User.findOne({
			emailVerificationToken: token,
			emailVerificationTokenExpires: { $gt: Date.now() },
		});

		if (!user) {
			throw new ApiError(400, "Invalid or expired verification link");
		}

		if (user.emailVerified) {
			return res
				.status(200)
				.json(new ApiResponse(200, null, "Email is already verified"));
		}
	} else {
		throw new ApiError(
			400,
			"Either OTP + Email or Verification Token is required"
		);
	}

	// Mark user as verified
	user.emailVerified = true;
	user.otp = undefined;
	user.otpExpires = undefined;
	user.emailVerificationToken = undefined;
	user.emailVerificationTokenExpires = undefined;

	await user.save();

	return res
		.status(200)
		.json(new ApiResponse(200, null, "Email verified successfully"));
};

const loginUser = asyncHandler(async (req, res) => {
	const { email, name, password } = req.body;
	console.log(email);

	if (!((name || email) && password)) {
		throw new ApiError(400, "username or email is required");
	}

	const user = await User.findOne({
		$or: [{ name }, { email }],
	});

	if (!user) {
		throw new ApiError(404, "User does not exist");
	}

	const isPasswordValid = await user.isPasswordCorrect(password);

	if (!isPasswordValid) {
		throw new ApiError(401, "Invalid user credentials");
	}

	const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(
		user._id
	);

	const loggedInUser = await User.findById(user._id).select(
		"-password -refreshToken"
	);

	const isProd = process.env.NODE_ENV === "production";

	const options = {
		httpOnly: true,
		secure: isProd, // ✅ false in dev, true in prod
		sameSite: isProd ? "none" : "lax", // ✅ 'none' for HTTPS cross-origin, 'lax' for dev
	};

	return res
		.status(200)
		.cookie("accessToken", accessToken, options)
		.cookie("refreshToken", refreshToken, options)
		.json(
			new ApiResponse(
				200,
				{
					user: loggedInUser,
					accessToken,
					refreshToken,
				},
				"User logged In Successfully"
			)
		);
});

const logoutUser = asyncHandler(async (req, res) => {
	await User.findByIdAndUpdate(
		req.user._id,
		{
			$unset: {
				refreshToken: 1,
			},
		},
		{
			new: true,
		}
	);

	const isProd = process.env.NODE_ENV === "production";

	const options = {
		httpOnly: true,
		secure: isProd, // ✅ false in dev, true in prod
		sameSite: isProd ? "none" : "lax", // ✅ 'none' for HTTPS cross-origin, 'lax' for dev
	};

	return res
		.status(200)
		.clearCookie("accessToken", options)
		.clearCookie("refreshToken", options)
		.json(new ApiResponse(200, {}, "User logged Out"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
	const incomingRefreshToken =
		req.cookies.refreshToken || req.body.refreshToken;

	if (!incomingRefreshToken) {
		throw new ApiError(401, "unauthorized request");
	}

	try {
		const decodedToken = jwt.verify(
			incomingRefreshToken,
			process.env.REFRESH_TOKEN_SECRET
		);

		const user = await User.findById(decodedToken?._id);

		if (!user) {
			throw new ApiError(401, "Invalid refresh token");
		}

		if (incomingRefreshToken !== user?.refreshToken) {
			throw new ApiError(401, "Refresh token is expired or used");
		}

		const isProd = process.env.NODE_ENV === "production";

		const options = {
			httpOnly: true,
			secure: isProd, // ✅ false in dev, true in prod
			sameSite: isProd ? "none" : "lax", // ✅ 'none' for HTTPS cross-origin, 'lax' for dev
		};

		const { accessToken, newRefreshToken } =
			await generateAccessAndRefereshTokens(user._id);

		return res
			.status(200)
			.cookie("accessToken", accessToken, options)
			.cookie("refreshToken", newRefreshToken, options)
			.json(
				new ApiResponse(
					200,
					{ accessToken, refreshToken: newRefreshToken },
					"Access token refreshed"
				)
			);
	} catch (error) {
		throw new ApiError(401, error?.message || "Invalid refresh token");
	}
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
	const { oldPassword, newPassword } = req.body;

	const user = await User.findById(req.user?._id);
	const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

	if (!isPasswordCorrect) {
		throw new ApiError(400, "Invalid old password");
	}

	user.password = newPassword;
	await user.save({ validateBeforeSave: false });

	return res
		.status(200)
		.json(new ApiResponse(200, {}, "Password changed successfully"));
});

const getCurrentUser = asyncHandler(async (req, res) => {
	return res
		.status(200)
		.json(new ApiResponse(200, req.user, "User fetched successfully"));
});

export {
	registerUser,
	loginUser,
	logoutUser,
	refreshAccessToken,
	changeCurrentPassword,
	getCurrentUser,
    verifyEmail
};
