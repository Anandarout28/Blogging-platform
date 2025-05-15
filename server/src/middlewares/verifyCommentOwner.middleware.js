import {Blog} from "../models/blog.model.js";
import mongoose from "mongoose";
import {ApiError} from "../utils/ApiError.js";

export const verifyCommentOwner = async (req, res, next) => {
  const { id, commentId } = req.params;
  console.log(id, commentId);
  

  if (!mongoose.Types.ObjectId.isValid(id) || !mongoose.Types.ObjectId.isValid(commentId)) {
    throw new ApiError(400, "Invalid blog or comment ID");
  }

  const blog = await Blog.findById(id);
  if (!blog) {
    throw new ApiError(404, "Blog not found");
  }

  const comment = blog.comments.id(commentId);
  if (!comment) {
    throw new ApiError(404, "Comment not found");
  }

  if (comment.user.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You are not authorized to modify this comment");
  }

  req.comment = comment;
  req.blog = blog;
  next();
};
