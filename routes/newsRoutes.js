import express from "express";

const router = express.Router();
// import { createNews} from "../controllers/newsControllers.js";
import { createNews, deleteNews, getAllNews, getNews, updateNews } from "../controllers/newsControllers.js";
import { authGuard, adminGuard } from "../middleware/authMiddleware.js";

router.route('/').post(authGuard,adminGuard,createNews).get(getAllNews);
// router.put('/:slug',authGuard,adminGuard,updateNews);
router.route('/:slug').put(authGuard,adminGuard,updateNews).delete(authGuard,adminGuard,deleteNews).get(getNews);










export default router;