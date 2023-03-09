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