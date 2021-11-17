'use strict';

var express = require('express');
var router = express.Router();
const {unifiedResult} = require("../../utils/index");


/**
 * login接口
 * api/user/login
 */
router.post('/login', function (req, res, next){
    const body = req.body;
    
    const where = {
        userName : body.userName
    }

  
});

module.exports = router;
