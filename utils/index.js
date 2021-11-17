/**
 * 统一处理返回函数
 * @param { object } res 返回体
 * @param { boolean } success 成功与否
 * @param { string } detailMsg 详情信息 【默认值：空字符串】
 * @param { object | array } data 返回数据 【默认值：一个对象】
 */
function unifiedResult(res, success, detailMsg = "", data = {}) {
    let result = {
        "code": 0,
        "msg": "success",
        "detailMsg": detailMsg,
        "data": data
    }

    !success && (result["code"] = 1, result["msg"] = "error");

    (Array.isArray(data) && data.length === 1) && (result.data = data[0]);

    res.json(result);
}

module.exports = {
    unifiedResult
};
