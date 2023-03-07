const { body } = require("express-validator");
const validate = require("../middleware/validate");
const { User } = require("../model");

exports.register = validate([
  // 1. 配置验证规则
  body("user.username")
    .notEmpty().withMessage("用户名不能为空")
    .custom(async (value) => {
      // 查询数据库查看数据是否存在
      const user = await User.findOne({ username: value });
      if (user) {
        return Promise.reject("用户已存在");
      }
    }),
    
  body("user.password").notEmpty().withMessage("密码不能为空"),
  
  body("user.email")
    .notEmpty().withMessage("邮箱不能为空")
    .isEmail().withMessage("邮箱格式不正确")
    .bail() // 如果错误就不向下执行
    .custom(async (value) => {
      // 查询数据库查看数据是否存在
      const user = await User.findOne({ email: value });
      if (user) {
        return Promise.reject("邮箱已存在");
      }
    }),
]);