import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { User } from "../models/user.model.js";
import { Blog } from "../models/blog.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const getAllPublishedBlogs = asyncHandler(async (req, res) => {
	const allPublishedBlog = await Blog.find({ isPublished: true });

	if (!allPublishedBlog || allPublishedBlog.length === 0) {
		throw new ApiError(404, "No published blogs found");
	}

	return res
		.status(200)
		.json(
			new ApiResponse(
				200,
				allPublishedBlog,
				"Published blogs fetched successfully"
			)
		);
});

const getBlogById = asyncHandler(async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		throw new ApiError(400, "Invalid blog ID");
	}

	const blog = await Blog.findById(id).populate("author", "name email");

	if (!blog) {
		throw new ApiError(500, "Something went wrong while fetching blog");
	}

	return res
		.status(200)
		.json(new ApiResponse(200, blog, "Blog by id fetched successfully"));
});

const getBlogsByAuthor = asyncHandler(async (req, res) => {
	const { userId } = req.params;

	if (!mongoose.Types.ObjectId.isValid(userId)) {
		throw new ApiError(400, "Invalid author ID");
	}

	const blogs = await Blog.find({ author: userId }).populate(
		"author",
		"name email"
	);

	if (blogs.length <= 0) {
		throw new ApiError(404, "No Blog found");
	}

	return res
		.status(200)
		.json(
			new ApiResponse(200, blogs, "Blogs by author fetched successfully")
		);
});

const getBlogsByCategory = asyncHandler(async (req, res) => {
	const category = req.query.c?.trim();

	if (!category) {
		throw new ApiError(400, "Empty query");
	}

	const blogs = await Blog.find({
		category: { $regex: category, $options: "i" },
	});

	if (blogs.length === 0) {
		throw new ApiError(404, "No blog is found");
	}

	return res
		.status(200)
		.json(
			new ApiResponse(200, blogs, "Similar blog searched successfully")
		);
});

const getBlogsByTag = asyncHandler(async (req, res) => {
	const tag = req.query.t?.trim();

	if (!tag) {
		throw new ApiError(400, "Empty query");
	}

	const blogs = await Blog.find({
		tags: { $regex: tag, $options: "i" },
	});

	if (blogs.length === 0) {
		throw new ApiError(404, "No blog is found");
	}

	return res
		.status(200)
		.json(
			new ApiResponse(200, blogs, "Similar blog searched successfully")
		);
});

// secured controllers

const createBlog = asyncHandler(async (req, res) => {
	const { title, content, coverImage, tags, category, ispublish } = req.body;

	// Basic validation
	if ([title, content].some((field) => !field || field.trim() === "")) {
		throw new ApiError(400, "Title and content fields cannot be empty.");
	}

	const author = req.user._id;

	// Normalize tags to an array
	const tagArray = Array.isArray(tags)
		? tags
		: typeof tags === "string"
		? tags
				.split(",")
				.map((tag) => tag.trim())
				.filter(Boolean)
		: [];

	const isPublished =
		typeof ispublish === "undefined"
			? true
			: String(ispublish).toLowerCase() === "true";

	const blog = await Blog.create({
		title,
		content,
		coverImage,
		author,
		tags: tagArray,
		category,
		isPublished
	});

	if (!blog) {
		throw new ApiError(500, "Something went wrong while creating the blog");
	}

	return res
		.status(201)
		.json(new ApiResponse(201, blog, "Blog created successfully"));
});

const updateBlog = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const { title, content, coverImage, tags, category, ispublish } = req.body;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		throw new ApiError(400, "Invalid blog ID");
	}

	const blog = await Blog.findById(id);
	if (!blog) {
		throw new ApiError(404, "Blog not found");
	}

	// Optional: Check if title is unchanged
	if (title && blog.title === title) {
		console.log("Title unchanged");
	}

	// Prepare updated fields only if they exist in the request
	const updatedFields = {};

	if (title) updatedFields.title = title;
	if (content) updatedFields.content = content;
	if (coverImage) updatedFields.coverImage = coverImage;
	if (Array.isArray(tags)) updatedFields.tags = tags;
	if (category) updatedFields.category = category;
	if (typeof ispublish === "boolean") updatedFields.ispublish = ispublish;

	// Update the blog
	const updatedBlog = await Blog.findByIdAndUpdate(
		id,
		{ $set: updatedFields },
		{ new: true }
	);

	if (!updatedBlog) {
		throw new ApiError(500, "Blog update failed");
	}

	// Send response
	return res
		.status(200)
		.json(new ApiResponse(200, updatedBlog, "Blog updated successfully"));
});

const deleteBlog = asyncHandler(async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		throw new ApiError(400, "Invalid blog ID");
	}

	const deletedBlog = await Blog.findByIdAndDelete(id);

	if (!deletedBlog) {
		throw new ApiError(404, "Blog not found or already deleted");
	}

	return res
		.status(200)
		.json(new ApiResponse(200, deletedBlog, "Blog deleted successfully"));
});

const togglePublishStatus = asyncHandler(async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		throw new ApiError(400, "Invalid blog ID");
	}

	const blog = await Blog.findById(id);

	if (!blog) {
		throw new ApiError(404, "Blog not found");
	}

	blog.isPublished = !blog.isPublished;
	await blog.save();

	return res
		.status(200)
		.json(new ApiResponse(200, blog, "Like toggled successfully"));
});

const addComment = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const { comment } = req.body;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		throw new ApiError(400, "Invalid blog ID");
	}

	if (!comment || comment.trim() === "") {
		throw new ApiError(400, "Comment cannot be empty");
	}

	const commentObj = {
		user: req.user._id,
		comment: comment.trim(),
	};

	const updatedBlog = await Blog.findByIdAndUpdate(
		id,
		{ $push: { comments: commentObj } },
		{ new: true }
	).populate("comments.user", "name email");

	if (!updatedBlog) {
		throw new ApiError(500, "Something went wrong while adding comment");
	}

	return res
		.status(201)
		.json(new ApiResponse(201, updatedBlog, "Comment added successfully"));
});

const deleteComment = asyncHandler(async (req, res) => {
	const { id, commentId } = req.params;

	if (
		!mongoose.Types.ObjectId.isValid(id) ||
		!mongoose.Types.ObjectId.isValid(commentId)
	) {
		throw new ApiError(400, "Invalid blog ID or comment ID");
	}

	const updatedBlog = await Blog.findByIdAndUpdate(
		id,
		{ $pull: { comments: { _id: commentId } } },
		{ new: true }
	);

	if (!updatedBlog) {
		throw new ApiError(404, "Blog or comment not found");
	}

	return res
		.status(200)
		.json(
			new ApiResponse(200, updatedBlog, "Comment deleted successfully")
		);
});

const editComment = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const { comment } = req.body;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		throw new ApiError(400, "Invalid blog ID");
	}

	if (!comment || comment.trim() === "") {
		throw new ApiError(400, "Comment cannot be empty");
	}

	const commentObj = {
		user: req.user._id,
		comment: comment.trim(),
	};

	const updatedBlog = await Blog.findByIdAndUpdate(
		id,
		{ $set: { comments: commentObj } },
		{ new: true }
	).populate("comments.user", "name email");

	if (!updatedBlog) {
		throw new ApiError(500, "Something went wrong while edting comment");
	}

	return res
		.status(200)
		.json(new ApiResponse(200, updatedBlog, "Comment edited successfully"));
});

const toggleLike = asyncHandler(async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		throw new ApiError(400, "Invalid blog ID");
	}

	const blog = await Blog.findById(id);

	if (!blog) {
		throw new ApiError(404, "Blog not found");
	}

	const userId = req.user._id;

	let update;

	if (blog.likes.includes(userId)) {
		// User already liked → remove the like
		update = await Blog.findByIdAndUpdate(
			id,
			{ $pull: { likes: userId } },
			{ new: true }
		);
	} else {
		// User hasn't liked → add the like
		update = await Blog.findByIdAndUpdate(
			id,
			{ $addToSet: { likes: userId } },
			{ new: true }
		);
	}

	return res
		.status(200)
		.json(new ApiResponse(200, update, "Like toggled successfully"));
});

const getBlogBySearch = asyncHandler(async (req, res) => {
	const searchKeyWord = req.query.q?.trim();

	if (!searchKeyWord) {
		throw new ApiError(400, "Empty query");
	}

	const blogs = await Blog.find({
		$or: [
			{ title: { $regex: searchKeyWord, $options: "i" } },
			{ content: { $regex: searchKeyWord, $options: "i" } },
			{ tags: { $regex: searchKeyWord, $options: "i" } },
			{ category: { $regex: searchKeyWord, $options: "i" } },
		],
	});

	if (blogs.length === 0) {
		throw new ApiError(404, "No blog is found");
	}

	return res
		.status(200)
		.json(
			new ApiResponse(200, blogs, "Similar blog searched successfully")
		);
});

// Admin Routes

const getAllBlogsAdmin = asyncHandler(async (req, res) => {
	const allBlog = await Blog.find();

	if (!allBlog || allBlog.length === 0) {
		throw new ApiError(404, "No blogs is found");
	}

	return res
		.status(200)
		.json(new ApiResponse(200, allBlog, "All blogs fetched successfully"));
});

const adminDeleteBlog = asyncHandler(async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		throw new ApiError(400, "Invalid blog ID");
	}

	const deletedBlog = await Blog.findByIdAndDelete(id);

	if (!deletedBlog) {
		throw new ApiError(404, "Blog not found or already deleted");
	}

	return res
		.status(200)
		.json(new ApiResponse(200, deletedBlog, "Blog deleted successfully"));
});

const promoteToAdmin = asyncHandler(async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		throw new ApiError(400, "Invalid blog ID");
	}

	const createdAdmin = await User.findByIdAndUpdate(
		id,
		{ $set: { role: "admin" } },
		{ new: true }
	);

	if (!createdAdmin) {
		throw new ApiError(500, "something went wrong while creating admin");
	}

	return res
		.status(200)
		.json(new ApiResponse(200, createdAdmin, "Admin created successfully"));
});

const getAllUSer = asyncHandler(async (req, res) => {
	const allUser = await User.find().select("-password -refreshToken");

	if (!allUser || allUser.length === 0) {
		throw new ApiError(404, "No User is found");
	}

	return res
		.status(200)
		.json(new ApiResponse(200, allUser, "All users fetched successfully"));
});

export {
	getAllPublishedBlogs,
	getBlogById,
	getBlogsByAuthor,
	getBlogsByTag,
	getBlogsByCategory,
	createBlog,
	updateBlog,
	deleteBlog,
	togglePublishStatus,
	addComment,
	deleteComment,
	editComment,
	toggleLike,
	getAllBlogsAdmin,
	adminDeleteBlog,
	getBlogBySearch,
	promoteToAdmin,
	getAllUSer,
};
