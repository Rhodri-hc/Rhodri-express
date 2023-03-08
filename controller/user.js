const { User } = require("../model");
const { jwtSecret } = require("../config/config.default");
const jwt = require('../utils/jwt');


// Authentication 用户登录
exports.login = async (req, res, next) => {
  try {
    // 处理请求
    // 得到用户信息[mongosse数据对象 转换成 json数据对象]
    const user = req.user.toJSON();
    // 生成token
    const token = await jwt.sign(
      {
        userId: user._id,
      },
      jwtSecret
    );
    // 移除密码属性
    delete user.password;
    // 发送成功响应（包含token的用户信息）
    res.status(200).json({
      ...user,
      token,
    });
    res.send("post /users/login");
  } catch (err) {
    next(err);
  }
};
  
  // Registration 用户注册
  exports.register = async (req, res, next) => {
    try {
      let user = new User(req.body.user);
      // 保存到数据库
      await user.save();
      // 转成json
      user = user.toJSON();
      // 删除密码属性
      delete user.password;
      // 4. 发送成功响应，返回用户数据
      res.status(201).json({
        user,
      });
    } catch (err) {
      next(err);
    }
  };
  
  // Get Current User 获取当前登录用户
  exports.getCurrentUser = async (req, res, next) => {
    try {
      // 处理请求
      res.send("get /user");
    } catch (err) {
      next(err);
    }
  };
  
  // Update User 更新用户
  exports.updateUser = async (req, res, next) => {
    try {
      // 处理请求
      res.send("put /user");
    } catch (err) {
      next(err);
    }
  };