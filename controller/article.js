const { Article } = require("../model");

// Create Article
exports.createArticle = async (req, res, next) => {
  try {
    // 处理请求
    const article = new Article(req.body.article);
    
    // 通过身份认证解析到的用户对象，获取id属性
    article.author = req.user._id;
    // 将数据映射到User并执行以下
    article.populate("author").execPopulate();
    
    await article.save();
    res.status(201).json({
      article,
    });
  } catch (err) {
    next(err);
  }
};


// Get Article
exports.getArticle = async (req, res, next) => {
    try {
      // 处理请求
      const article = await Article.findById(req.params.articleId).populate("author");
      if (!article) {
        return res.status(404).end();
      }
      res.status(200).json({
        article,
      });
    } catch (err) {
      next(err);
    }
};

// // List Articles（返回所有文章）
// exports.listArticles = async (req, res, next) => {
//   try {
//     // 处理请求
//     const articles = await Article.find();
//     const articlesCont = await Article.countDocuments();
//     res.status(200).json({
//       articles,
//       articlesCont,
//     });
//     res.send("get /articles/");
//   } catch (err) {
//     next(err);
//   }
// };

// // List Articles （数据分页）
// exports.listArticles = async (req, res, next) => {
//   try {
//     // 处理请求
    
//     // 解析数据参数，并设置默认值
//     const { limit = 20, offset = 0 } = req.query;
//     const articles = await Article.find()
//       .skip(+offset) // 跳过多少条
//       .limit(+limit); // 取多少条
      
//     const articlesCont = await Article.countDocuments();
//     res.status(200).json({
//       articles,
//       articlesCont,
//     });
//     res.send("get /articles/");
//   } catch (err) {
//     next(err);
//   }
// };


// // List Articles（筛选标签）
// exports.listArticles = async (req, res, next) => {
//   try {
//     // 处理请求

//     // 解析数据参数，并设置默认值
//     const { limit = 20, offset = 0, tag } = req.query;

//     // 定义一个过滤对象
//     const filter = {};
//     if (tag) {
//       filter.tagList = tag;
//     }

//     const articles = await Article.find(filter)
//       .skip(+offset) // 跳过多少条
//       .limit(+limit); // 取多少条
//     const articlesCont = await Article.countDocuments();
//     res.status(200).json({
//       articles,
//       articlesCont,
//     });
//     res.send("get /articles/");
//   } catch (err) {
//     next(err);
//   }
// };

// List Articles（筛选文章作者）
exports.listArticles = async (req, res, next) => {
  try {
    // 处理请求

    // 解析数据参数，并设置默认值
    const { limit = 20, offset = 0, tag, author } = req.query;

    // 定义一个过滤对象(查询用的)
    const filter = {};
    if (tag) {
      filter.tagList = tag;
    }
    if (author) {
      const user = await User.findOne({ username: author });
      filter.author = user ? user._id : null;
    }

    const articles = await Article.find(filter)
      .skip(+offset) // 跳过多少条
      .limit(+limit); // 取多少条

      // 数据排序
    // const articles = await Article.find(filter)
    //   .skip(+offset) // 跳过多少条
    //   .limit(+limit) // 取多少条
    //   .sort({        // 排序
    //     // -1：倒序   1：升序
    //     createdAt: -1,
    // });
    const articlesCont = await Article.countDocuments();
    res.status(200).json({
      articles,
      articlesCont,
    });
    res.send("get /articles/");
  } catch (err) {
    next(err);
  }
};

// Update Article
exports.updateArticle = async (req, res, next) => {
  try {
    const article = req.article;
    const bodyArticle = req.body.article;
    article.title = bodyArticle.title || article.title;
    article.description = bodyArticle.description || article.description;
    article.body = bodyArticle.body || article.body;
    await article.save();
    res.status(200).json({
      article,
    });
  } catch (err) {
    next(err);
  }
};

// Delete Article
exports.deleteArticle = async (req, res, next) => {
  try {
    console.log(req.article);
    const article = req.article;
    await article.remove();
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};