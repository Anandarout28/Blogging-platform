import jwt from "jsonwebtoken";

export const generateEmailVerificationToken = (user) => {
	return jwt.sign(
		{
			_id: user._id,
			email: user.email,
		},
		process.env.EMAIL_VERIFICATION_TOKEN_SECRET,
		{
			expiresIn: process.env.EMAIL_VERIFICATION_TOKEN_EXPIRY,
		}
	);
};
