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
    // getAllBlogsAdmin,
    // adminDeleteBlog

} from "../controllers/blog.controller.js";


const router = Router();

router.route("/").get(getAllPublishedBlogs);
router.route("/:id").get(getBlogById);
router.route("/author/:userId").get(getBlogsByAuthor);
router.route("/tag/:tag").get(getBlogsByTag);
router.route("/category/:category").get(getBlogsByCategory);

//secured routes
router.route("/").post(verifyJWT, createBlog);
router.route("/:id").put(verifyJWT, updateBlog);
router.route("/:id").delete(verifyJWT, deleteBlog);
router.route("/:id/publish").put(verifyJWT, togglePublishStatus);

router.route("/:id/comment").post(verifyJWT, addComment);
router.route("/:id/comment/:commentId").delete(verifyJWT, deleteComment);
router.route("/:id/comment/:commentId").put(verifyJWT, editComment);

router.route("/:id/like").post(verifyJWT, toggleLike);


// // Admin only routes
// router.route("/all").get(verifyJWT,authorizeRoles('admin'), getAllBlogsAdmin);
// router.route("/:id").delete(verifyJWT,authorizeRoles('admin'), adminDeleteBlog);

export default router
