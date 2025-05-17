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
    getBlogBySearch,
    promoteToAdmin,
    getAllUSer

} from "../controllers/blog.controller.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";
import { verifyBlogOwner } from "../middlewares/verifyBlogOwner.middleware.js";
import { verifyCommentOwner } from "../middlewares/verifyCommentOwner.middleware.js";


const router = Router();

router.route("/").get(getAllPublishedBlogs);
router.route("/search").get(getBlogBySearch)
router.route("/category").get(getBlogsByCategory);
router.route("/tag").get(getBlogsByTag);
router.route("/author/:userId").get(getBlogsByAuthor);
router.route("/:id").get(getBlogById);

//secured routes
router.route("/").post(verifyJWT, createBlog);
router.route("/:id").put(verifyJWT,verifyBlogOwner, updateBlog);
router.route("/:id").delete(verifyJWT,verifyBlogOwner, deleteBlog);
router.route("/:id/publish").put(verifyJWT,verifyBlogOwner, togglePublishStatus);

router.route("/:id/comment").post(verifyJWT, addComment);
router.route("/:id/comment/:commentId").delete(verifyJWT,verifyCommentOwner, deleteComment);
router.route("/:id/comment/:commentId").put(verifyJWT,verifyCommentOwner, editComment);

router.route("/:id/like").post(verifyJWT, toggleLike);



// // Admin only routes
router.route("/admin/allBlogs").get(verifyJWT,authorizeRoles('admin'), getAllBlogsAdmin);
router.route("/admin/:id").delete(verifyJWT,authorizeRoles('admin'), adminDeleteBlog);
router.route("/admin/:id").put(verifyJWT,authorizeRoles('admin'), promoteToAdmin);
router.route("/admin/allUsers").get(verifyJWT,authorizeRoles('admin'), getAllUSer);

export default router
