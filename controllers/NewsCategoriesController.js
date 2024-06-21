
import NewsCategories from "../models/NewsCategories.js";
import News from "../models/News.js";


const createNewsCategory = async(req,res,next)=>{

  try {
    const {title} = req.body;

    const news = await NewsCategories.findOne({title});

    if(news){
      const error = new Error("Category is already created");
      return next(error)
    }

    const newNewsCategory = new NewsCategories({title});

    const savedNewsCategory = await newNewsCategory.save();

    return res.status(201).json(savedNewsCategory)

  } catch (error) {
    next(error);
  }
};

const getSingleCategory = async (req, res, next) => {
  try {
    const newsCategory = await NewsCategories.findById(
      req.params.newsCategoryId
    );

    if (!postCategory) {
      const error = new Error("Category was not found!");
      return next(error);
    }

    return res.json(postCategory);
  } catch (error) {
    next(error);
  }
};


const getAllNewsCategories = async (req, res, next) => {
  try {
    const filter = req.query.searchKeyword;
    let where = {};
    if (filter) {
      where.title = { $regex: filter, $options: "i" };
    }
    let query = NewsCategories.find(where);
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * pageSize;
    const total = await NewsCategories.find(where).countDocuments();
    const pages = Math.ceil(total / pageSize);

    res.header({
      "x-filter": filter,
      "x-totalcount": JSON.stringify(total),
      "x-currentpage": JSON.stringify(page),
      "x-pagesize": JSON.stringify(pageSize),
      "x-totalpagecount": JSON.stringify(pages),
    });

    if (page > pages) {
      return res.json([]);
    }

    const result = await query
      .skip(skip)
      .limit(pageSize)
      .sort({ updatedAt: "desc" });

    return res.json(result);
  } catch (error) {
    next(error);
  }
};

const updateNewsCategory = async (req, res, next) => {
  try {
    const { title } = req.body;

    const newsCategory = await NewsCategories.findByIdAndUpdate(
      req.params.newsCategoryId,
      {
        title,
      },
      {
        new: true,
      }
    );

    if (!newsCategory) {
      const error = new Error("Category was not found");
      return next(error);
    }

    return res.json(newsCategory);
  } catch (error) {
    next(error);
  }
};

const deleteNewsCategory = async (req, res, next) => {
  try {
    const categoryId = req.params.newsCategoryId;

    await News.updateMany(
      { categories: { $in: [categoryId] } },
      { $pull: { categories: categoryId } }
    );

    await NewsCategories.deleteOne({ _id: categoryId });

    res.send({
      message: "Post category is successfully deleted!",
    });
  } catch (error) {
    next(error);
  }
};




export { createNewsCategory, getSingleCategory ,getAllNewsCategories,deleteNewsCategory,updateNewsCategory };