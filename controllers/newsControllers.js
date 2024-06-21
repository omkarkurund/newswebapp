// import { version } from "mongoose";/
import News from "../models/News.js";
import Comment from "../models/Comment.js"
import { fileRemover } from "../utils/fileRemover.js";
import { uploadPicture } from "../middleware/uploadPictureMiddleware.js";

import { v4 as uuidv4 } from 'uuid';
import { populate } from "dotenv";
const createNews = async (req, res, next) => {
  try {

    const news = new News({
      title: "sample title",
      caption: "sample caption",
      slug: uuidv4(),
      body: {
        type: "doc",
        content: []
      },
      photo: "",
      user: req.user._id
    });

    const createdNews = await news.save();
    return res.json(createdNews);
  } catch (error) {
    next(error);
  }
};


// const updateNews = async (req, res, next) => {
//     try {
//       const news = await News.findOne({ slug: req.params.slug });

//       if (!news) {
//         const error = new Error("News was not found");
//         next(error);
//         return;
//       }

//       const upload = uploadPicture.single("newstPicture");

//       const handleUpdateNewsData = async (data) => {
//         const { title, caption, slug, body, tags, categories } = JSON.parse(data);
//         news.title = title || news.title;
//         news.caption = caption || news.caption;
//         news.slug = slug || news.slug;
//         news.body = body || news.body;
//         news.tags = tags || news.tags;
//         news.categories = categories || news.categories;
//         const updatedNews = await news.save();
//         return res.json(updatedNews);
//       };

//       upload(req, res, async function (err) {
//         if (err) {
//           const error = new Error(
//             "An unknown error occured when uploading " + err.message
//           );
//           next(error);
//         } else {
//           // every thing went well
//           if (req.file) {
//             let filename;
//             filename = news.photo;
//             if (filename) {
//               fileRemover(filename);
//             }
//             news.photo = req.file.filename;
//             handleUpdateNewsData(req.body.document);
//           } else {
//             let filename;
//             filename = news.photo;
//             news.photo = "";
//             fileRemover(filename);
//             handleUpdateNewsData(req.body.document);
//           }
//         }
//       });
//     } catch (error) {
//       next(error);
//     }
//   };


// mycode
// const updateNews = async (req, res, next) => {
//   try {
//     const news = await News.findOne({ slug: req.params.slug });

//     if (!news) {
//       const error = new Error("News aws not found");
//       next(error);
//       return;
//     }

//     const upload = uploadPicture.single("NewsPicture");

//     const handleUpdateNewsData = async (data) => {
//       const { title, caption, slug, body, tags, categories } = JSON.parse(data);
//       news.title = title || news.title;
//       news.caption = caption || news.caption;
//       news.slug = slug || news.slug;
//       news.body = body || news.body;
//       news.tags = tags || news.tags;
//       news.categories = categories || news.categories;
//       const updatedNews = await news.save();
//       return res.json(updatedNews);
//     };

//     upload(req, res, async function (err) {
//       if (err) {
//         const error = new Error(
//           "An unknown error occured when uploading " + err.message
//         );
//         next(error);
//       } else {
//         // every thing went well
//         if (req.file) {
//           let filename;
//           filename = news.photo;
//           if (filename) {
//             fileRemover(filename);
//           }
//           news.photo = req.file.filename;
//           handleUpdateNewsData(req.body.document);
//         } else {
//           let filename;
//           filename = news.photo;
//           news.photo = "";
//           fileRemover(filename);
//           handleUpdateNewsData(req.body.document);
//         }
//       }
//     });
//   } catch (error) {
//     next(error);
//   }
// };

const deleteNews = async (req, res, next) => {
  try {
    const news = await News.findOneAndDelete({ slug: req.params.slug });

    if (!news) {
      const error = new Error("News was not found");
      return next(error);
    }

    fileRemover(news.photo);

    await Comment.deleteMany({ news: news._id });

    return res.json({
      message: "News is successfully deleted",
    });
  } catch (error) {
    next(error);
  }
};

// added code new
const updateNews = async (req, res, next) => {
  try {
      const news = await News.findOne({ slug: req.params.slug });

      if (!news) {
          const error = new Error("News was not found");
          next(error);
          return;
      }

      const upload = uploadPicture.single("postPicture");

      const handleUpdateNewsData = async (data) => {
          let documentData;
          try {
              documentData = JSON.parse(data);
          } catch (error) {
              console.error("Error parsing JSON:", error.message);
              return res.status(400).send("Invalid JSON in document field");
          }

          const { title, caption, slug, body, tags, categories } = documentData;
          news.title = title || news.title;
          news.caption = caption || news.caption;
          news.slug = slug || news.slug;
          news.body = body || news.body;
          news.tags = tags || news.tags;
          news.categories = categories || news.categories;

          if (req.file) {
              let filename = news.photo;
              if (filename) {
                  fileRemover(filename);
              }
              news.photo = req.file.filename;
          } else {
              let filename = news.photo;
              news.photo = "";
              fileRemover(filename);
          }

          const updatedNews = await news.save();
          return res.json(updatedNews);
      };

      upload(req, res, async function (err) {
          if (err) {
              const error = new Error("An unknown error occurred when uploading: " + err.message);
              next(error);
          } else {
              handleUpdateNewsData(req.body.document);
          }
      });
  } catch (error) {
      next(error);
  }
};


const getNews = async (req, res, next) => {
  try {
    // const news = await News.findOne({ slug: req.params.slug }).populate([
    //   {
    //     path: "user",
    //     select: ["avatar", "name"],
    //   },
    //   {
    //     path: "NewCategories",
    //     select: ["title"],
    //   },
    //   {
    //     path: "comments",
    //     match: {
    //       check: true,
    //       parent: null,
    //     },
    //     populate: [
    //       {
    //         path: "user",
    //         select: ["avatar", "name"],
    //       },
    //       {
    //         path: "replies",
    //         match: {
    //           check: true,
    //         },
    //         populate: [
    //           {
    //             path: "user",
    //             select: ["avatar", "name"],
    //           },
    //         ],
    //       },
    //     ],
    //   },
    // ]);

    const news = await News.findOne({ slug: req.params.slug }).populate([
      {
        path: "user",
        select: ["avatar", "name"],
      },
      {
        path: "categories",
        select: ["title"],
      },
      {
            path: "comments",
            match: {
              check: true,
              parent: null,
            },
                populate: [
                  {
                    path: "user",
                    select: ["avatar", "name"],
                  },
                  {
                      path: "replies",
                      match: {
                      check: true,
                   },
                   populate:[
                    {
                    path: "user",
                    select: ["avatar", "name"],
                    }
                   ]
                   }
              ]}
    ]);

    if (!news) {
      const error = new Error("News was not found");
      return next(error);
    }

    return res.json(news);
  } catch (error) {
    next(error);
  }
};




// const getAllNews= async(req,res,next)=>{
//   try {

//     // const news = await News.find({}).populate([
//     //   {
//     //     path:"user",
//     //     select: ["avatar","name"]
//     //   }
//     // ]);
//     // res.json(news)

//     const filter = req.query.searchKeyword;
//     let where= {};
//     if(filter){
//       where.title = {$regex: filter, $options:'i' };
//     }

//     let query = News.find(where);
//     console.log(query)
//     const page =parseInt(req.query.page) || 1;
//     const pageSize = parseInt(req.query.limit) || 10;
//     const skip = (page - 1) * pageSize;
//     const total = await News.countDocuments();
//     const pages = Math.ceil(total / pageSize);

//     if(page > pages){
//       const error = new Error("No Page Found");
//       return next(error);
//     }

//     const result = await query.skip(skip).limit(pageSize).populate([
//       {
//         path:"user",
//         select: ['avatar','name','verified']
//       }
//     ]).sort({updatedAt : 'desc'});

//     res.header({
//       'x-filter': filter,
//       'x-totalcount': JSON.stringify(total),
//       'x-currentpage':JSON.stringify(page),
//       'x-pagesize':JSON.stringify(pageSize),
//       'x-totalpagecount': JSON.stringify(pages)
//     });

//     return res.json(result);

//   } catch (error) {
//     next(error)
//   }
// }


const getAllNews = async (req, res, next) => {
  try {
    const filter = req.query.searchKeyword || '';
    let where = {};
    if (filter) {
      where.title = { $regex: filter, $options: 'i' };
    }

    let query = News.find(where);
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * pageSize;
    const total = await News.countDocuments(where);
    const pages = Math.ceil(total / pageSize);

    // res.set({
    //   'x-filter': filter,
    //   'x-totalcount': total,
    //   'x-currentpage': page,
    //   'x-pagesize': pageSize,
    //   'x-totalpagecount': pages
    // });

    res.header({
      'x-filter': filter,
      'x-totalcount': JSON.stringify(total),
      'x-currentpage': JSON.stringify(page),
      'x-pagesize': JSON.stringify(pageSize),
      'x-totalpagecount': JSON.stringify(pages)
    });

    if (page > pages) {
      return res.json([])
    }

    const result = await query.skip(skip).limit(pageSize).populate([
      {
        path: "user",
        select: ['avatar', 'name', 'verified']
      }
    ]).sort({ updatedAt: 'desc' });

    

    

    return res.json(result);

  } catch (error) {
    next(error);
  }
};


export {
  createNews,
  updateNews,
  deleteNews,
  getNews,
  getAllNews
};