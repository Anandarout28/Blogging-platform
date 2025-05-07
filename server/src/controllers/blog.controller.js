import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { User } from "../models/user.model.js";
import { Blog } from "../models/blog.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const getAllPublishedBlogs = asyncHandler(async (req, res) => {
	const allBlog = await Blog.find();

	if (!allBlog) {
		throw new ApiError(500, "Something went wrong while fetching blog");
	}

	return res
		.status(200)
		.json(new ApiResponse(200, allBlog, "Blog fetched successfully"));
	ṅ;
});

const getBlogById = asyncHandler(async (req, res) => {
	const { id } = req.params;
	console.log(req.params);

	if (!mongoose.Types.ObjectId.isValid(id)) {
		throw new ApiError(400, "Invalid blog ID");
	}

	const blog = await Blog.findById(id).populate("author", "name email");

	if (!blog) {
		throw new ApiError(500, "Something went wrong while fetching blog");
	}

	return res
		.status(200)
		.json(new ApiResponse(200, blog, "Blogs by id fetched successfully"));
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

	if (!blogs) {
		throw new ApiError(500, "Something went wrong while fetching blogs");
	}

	return res
		.status(200)
		.json(
			new ApiResponse(200, blogs, "Blogs by author fetched successfully")
		);
});

const getBlogsByCategory = asyncHandler(async (req, res) => {
		const { category } = req.params;
		const page = parseInt(req.query.page) || 1;
		const limit = parseInt(req.query.limit) || 10;

		if (!category) {
			throw new ApiError(400, "Category is required");
		}

		const skip = (page - 1) * limit;

		const blogs = await Blog.find({ category })
			.sort({ createdAt: -1 })
			.skip(skip)
			.limit(limit)
			.populate("author", "name username");

		const total = await Blog.countDocuments({ category });

		return res.status(200).json(
			new ApiResponse(
				200,
				{
					blogs,
					pagination: {
						total,
						page,
						pages: Math.ceil(total / limit),
					},
				},
				"Blogs by category fetched"
			)
		);
});

const getBlogsByTag = asyncHandler(async (req, res) => {
	const { tagsId } = req.params;

	const blogs = await Blog.find({ tags: tagsId });

	if (!blogs) {
		throw new ApiError(500, "Something went wrong while fetching blogs");
	}

	return res
		.status(200)
		.json(
			new ApiResponse(200, blogs, "Blogs by tags fetched successfully")
		);
});

// secured controllers

const createBlog = asyncHandler(async (req, res) => {
	const { title, content, coverImage, tags, category, ispublish } = req.body;

	if ([title, content].some((field) => field?.trim() === "")) {
		throw new ApiError(400, "Title and content fields cannot be empty.");
	}

	const author = req.user._id;

	const blog = await Blog.create({
		title,
		content,
		coverImage,
		author,
		tags: Array.isArray(tags) ? tags : tags?.split(",") || [],
		category,
		ispublish: typeof ispublish === "boolean" ? ispublish : false,
	});

	if (!blog) {
		throw new ApiError(500, "Something went wrong while creating the blog");
	}

	return res
		.status(201)
		.json(new ApiResponse(201, blog, "Blog created successfully"));
});

const updateBlog = asyncHandler(async (req, res) => {
	const { blogId } = req.params;

	if (!mongoose.Types.ObjectId.isValid(blogId)) {
		throw new ApiError(400, "Invalid author ID");
	}

	const { title, content, coverImage, tag, category, ispublish } = req.body;

	if ([title, content, author].some((field) => field?.trim() === "")) {
		throw new ApiError(
			400,
			"Title, content, and author fields cannot be empty."
		);
	}
});

const deleteBlog = asyncHandler(async (req, res) => {});

const togglePublishStatus = asyncHandler(async (req, res) => {});
const addComment = asyncHandler(async (req, res) => {});

const deleteComment = asyncHandler(async (req, res) => {});

const toggleLike = asyncHandler(async (req, res) => {});

const getAllBlogsAdmin = asyncHandler(async (req, res) => {});

const adminDeleteBlog = asyncHandler(async (req, res) => {});

const editComment = asyncHandler(async (req, res) => {});

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
	// getAllBlogsAdmin,
	// adminDeleteBlog
};
