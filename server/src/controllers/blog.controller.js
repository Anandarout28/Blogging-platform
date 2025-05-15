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
	// const { category } = req.params;
	// const page = parseInt(req.query.page) || 1;
	// const limit = parseInt(req.query.limit) || 10;
	// if (!category) {
	// 	throw new ApiError(400, "Category is required");
	// }
	// const skip = (page - 1) * limit;
	// const blogs = await Blog.find({ category })
	// 	.sort({ createdAt: -1 })
	// 	.skip(skip)
	// 	.limit(limit)
	// 	.populate("author", "name username");
	// const total = await Blog.countDocuments({ category });
	// return res.status(200).json(
	// 	new ApiResponse(
	// 		200,
	// 		{
	// 			blogs,
	// 			pagination: {
	// 				total,
	// 				page,
	// 				pages: Math.ceil(total / limit),
	// 			},
	// 		},
	// 		"Blogs by category fetched"
	// 	)
	// );
});

const getBlogsByTag = asyncHandler(async (req, res) => {
	// const { tags } = req.query;
	// if (!tags) {
	//   throw new ApiError(400, "Tags query parameter is required");
	// }
	// // Convert to array, clean up, and lowercase to match DB storage
	// const tagArray = Array.isArray(tags)
	//   ? tags.map(tag => tag.toLowerCase().trim()).filter(Boolean)
	//   : tags
	//       .split(",")
	//       .map(tag => tag.toLowerCase().trim())
	//       .filter(Boolean);
	// if (tagArray.length === 0) {
	//   throw new ApiError(400, "At least one valid tag must be provided");
	// }
	// // Pagination
	// const page = parseInt(req.query.page) || 1;
	// const limit = parseInt(req.query.limit) || 10;
	// const skip = (page - 1) * limit;
	// const blogs = await Blog.find({
	//   tags: { $in: tagArray },
	//   ispublish: true,
	// })
	//   .sort({ createdAt: -1 })
	//   .skip(skip)
	//   .limit(limit)
	//   .populate("author", "name email");
	// const total = await Blog.countDocuments({
	//   tags: { $in: tagArray },
	//   ispublish: true,
	// });
	// return res.status(200).json(
	//   new ApiResponse(
	//     200,
	//     {
	//       blogs,
	//       pagination: {
	//         total,
	//         page,
	//         pages: Math.ceil(total / limit),
	//       },
	//     },
	//     "Blogs fetched by tags"
	//   )
	// );
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

        const blog = await Blog.create({
            title,
            content,
            coverImage,
            author,
            tags: tagArray,
            category,
            isPublished: String(ispublish).toLowerCase() === "true",
          });

	if (!blog) {
		throw new ApiError(500, "Something went wrong while creating the blog");
	}

	return res
		.status(201)
		.json(new ApiResponse(201, blog, "Blog created successfully"));
});

const updateBlog = asyncHandler(async (req, res) => {
	// const { blogId } = req.params;
	// if (!mongoose.Types.ObjectId.isValid(blogId)) {
	// 	throw new ApiError(400, "Invalid author ID");
	// }
	// const { title, content, coverImage, tag, category, ispublish } = req.body;
	// if ([title, content, author].some((field) => field?.trim() === "")) {
	// 	throw new ApiError(
	// 		400,
	// 		"Title, content, and author fields cannot be empty."
	// 	);
	// }
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
		.status(201)
		.json(new ApiResponse(201, updatedBlog, "Comment edited successfully"));
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

const getAllBlogsAdmin = asyncHandler(async (req, res) => {
    const allBlog = await Blog.find();

	if (!allBlog || allBlog.length === 0) {
		throw new ApiError(404, "No blogs is found");
	}

	return res
		.status(200)
		.json(
			new ApiResponse(
				200,
				allBlog,
				"All blogs fetched successfully"
			)
		);
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

const getBlogBySearch = asyncHandler( async (req, res ) => {
    const searchKeyWord =  req.query.q?.trim();

    if (!searchKeyWord) {
        throw new ApiError(400, "Empty query");
    }
    
    const blog = await Blog.find({
        $or: [
            { title: { $regex: searchKeyWord, $options: 'i' } },
            { content: { $regex: searchKeyWord, $options: 'i' } },
            { tags: { $regex: searchKeyWord, $options: 'i' } }
        ]
    });

    if (blog.length === 0) {
        throw new ApiError(404, "No blog is found");
    }
    
    return res
		.status(200)
		.json(new ApiResponse(200, blog, "Similar blog searched successfully"));
})

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
    getBlogBySearch
};
