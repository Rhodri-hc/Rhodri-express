'use strict';

const express = require('express');
const router = express.Router();

const { unifiedResult } = require("../../utils/index");

/**
 * 新增文章
 * @api {post} api/article/
 */
router.post('/', function (req, res) {

    const body = req.body;

    const data = {
        'type': body.type,
        'tag': body.tag,
        'title': body.title,
        'intro': body.intro,
        'content': body.content,
        'read': body.read,
        'show': body.show,
        'homeShow': body.homeShow,
        'like': body.like
    };

   

/**
 * 根据id删除文章
 * @api {delete} api/article/
 */
router.delete('/', function (req, res) {

    const idArr = req.body.arr;

    const where = { 'id': idArr };


});

/**
 * 根据id修改指定文章信息
 * @api {put} api/article/:id
 */
router.put('/:id', function (req, res) {

    const id = req.params.id;

    const { exclude, ...body } = req.body;

});

/**
 * 根据id获取指定文章信息
 * @api {get} api/article/:id
 */
router.get('/:id', function (req, res) {

    const id = req.params.id;

    req.query.type = req.query.type || "defalut";



});

/**
 * 根据id寻找文章，自增阅读数
 * @api {put} api/article/read/:id
 */
router.put('/read/:id', function (req, res) {

    const id = req.params.id;



});

/**
 * 根据分页信息来获取文章列表
 * @api {post} api/article/list
 */
router.post("/list", function (req, res) {
    const body = req.body;
    const page = +body.page;
    const pageSize = +body.pageSize;
    const type = body.type || "default";
    const where = body.where || {};
    body.exclude = body.exclude || [];

    //  type为default时，只拉取展示的文章，且将show字段隐藏
    (type == "default") && (where.show = "1", body.exclude = ["show", "homeShow", ...body.exclude]);

    const query = {
        //  根据时间倒叙查询
        order: "createdAt DESC",
        //  查询条件
        where,
        //  查询的偏移量 “开始的数据索引，比如当page=2 时offset=10，而pagesize我们定义为10，则现在为索引为10，也就是从第11条开始返回数据条目”
        offset: (page - 1) * pageSize,
        //  每页限制返回的数据条数
        limit: pageSize,
        //  排除字段，这里排除文章的内容
        attributes: {
            exclude: body.exclude
        }
    }

  
});

/**
 * 根据id寻找文章增加like字段
 * @api {get} api/article/like/:id
 */
router.put('/like/:id', function (req, res) {

    const id = req.params.id;

    const ip = req.realIp;


});

/**
 * 根据参数获取对应的文章数量
 * @api {post} api/article/articleAmount
 */
router.post('/articleAmount', function (req, res) {

    const condition = {
        'where': req.body
    }



});

module.exports = router;
