import { Schema, model } from "mongoose";

const NewsSchema = new Schema(
  {
    title: { type: String, required: true },
    caption: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    body: { type: Object, required: true },
    photo: { type: String, required: false },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    tags: { type: [String] },
    categories: [{ type: Schema.Types.ObjectId, ref: "NewsCategories" }],
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

NewsSchema.virtual("comments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "news",
});

const News = model("News", NewsSchema);
export default News;
