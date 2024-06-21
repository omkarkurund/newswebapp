import express from "express";

const router = express.Router();
// import { createNews} from "../controllers/newsControllers.js";
import { createComment, deleteComment, updateComment} from "../controllers/commentControllers.js";
import { authGuard} from "../middleware/authMiddleware.js";

router.post('/',authGuard,createComment);
// router.put('/:commentId',authGuard,updateComment);
router.route('/:commentId').put(authGuard,updateComment).delete(authGuard,deleteComment);


// router.put('/:slug',authGuard,adminGuard,updateNews);










export default router;