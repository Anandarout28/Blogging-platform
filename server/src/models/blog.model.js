import mongoose, { Schema } from "mongoose";

const blogSchema = new Schema(
	{
		title: {
			type: String,
			required: [true, "Blog title is required"],
			trim: true,
			maxlength: 150,
		},
		content: {
			type: String,
			required: [true, "Blog content is required"],
		},
		coverImage: {
			type: String, // URL or cloud storage path
			default: "",
		},
		author: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		tags: [
			{
				type: String,
				trim: true,
				lowercase: true,
			},
		],
		category: {
			type: String,
			trim: true,
			default: "General",
		},
		isPublished: {
			type: Boolean,
			default: true,
		},
		likes: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
			},
		],
		comments: [
			{
				user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
				comment: { type: String, required: true },
				createdAt: { type: Date, default: Date.now },
			},
		],
	},
	{ 
        timestamps: true 
    }
);

export const Blog = mongoose.model("Blog", blogSchema);
