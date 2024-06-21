import express from "express";

const router = express.Router();
import { createNewsCategory, deleteNewsCategory, getAllNewsCategories, updateNewsCategory } from "../controllers/NewsCategoriesController.js";
import { adminGuard, authGuard } from "../middleware/authMiddleware.js";


router.route('/').post(authGuard, adminGuard,createNewsCategory).get(getAllNewsCategories);

router.route('/:newsCategoryId').put(authGuard,adminGuard,updateNewsCategory).delete(authGuard,adminGuard,deleteNewsCategory);





export default router;