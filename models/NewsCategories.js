import { Schema, model } from "mongoose";

const NewsCategoriesSchema = new Schema(
  {
    title: { type: String, required: true },
  },
  { timestamps: true }
);

const NewsCategories = model("NewsCategories", NewsCategoriesSchema);
export default NewsCategories;
