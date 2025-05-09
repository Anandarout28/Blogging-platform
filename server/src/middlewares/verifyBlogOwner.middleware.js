import { Blog } from "../models/blog.model.js";
import mongoose from "mongoose";
import { ApiError } from "../utils/ApiError.js";

export const verifyBlogOwner = async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid blog ID");
  }

  const blog = await Blog.findById(id);
  if (!blog) {
    throw new ApiError(404, "Blog not found");
  }

  if (blog.author.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You are not authorized to perform this action");
  }

  req.blog = blog; // Optional: pass blog to next handler
  next();
};
