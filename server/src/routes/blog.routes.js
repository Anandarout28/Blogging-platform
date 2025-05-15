import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { 
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

} from "../controllers/blog.controller.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";
import { verifyBlogOwner } from "../middlewares/verifyBlogOwner.middleware.js";
import { verifyCommentOwner } from "../middlewares/verifyCommentOwner.middleware.js";


const router = Router();

router.route("/").get(getAllPublishedBlogs);
router.route("/:id").get(getBlogById);
router.route("/author/:userId").get(getBlogsByAuthor);
router.route("/tag/:tag").get(getBlogsByTag);
router.route("/category/:category").get(getBlogsByCategory);

//secured routes
router.route("/").post(verifyJWT, createBlog);
router.route("/:id").put(verifyJWT,verifyBlogOwner, updateBlog);
router.route("/:id").delete(verifyJWT,verifyBlogOwner, deleteBlog);
router.route("/:id/publish").put(verifyJWT,verifyBlogOwner, togglePublishStatus);

router.route("/:id/comment").post(verifyJWT, addComment);
router.route("/:id/comment/:commentId").delete(verifyJWT,verifyCommentOwner, deleteComment);
router.route("/:id/comment/:commentId").put(verifyJWT,verifyCommentOwner, editComment);

router.route("/:id/like").post(verifyJWT, toggleLike);

router.route("/search").get(getBlogBySearch)


// // Admin only routes
router.route("/admin/all").get(verifyJWT,authorizeRoles('admin'), getAllBlogsAdmin);
router.route("/admin/:id").delete(verifyJWT,authorizeRoles('admin'), adminDeleteBlog);

export default router
