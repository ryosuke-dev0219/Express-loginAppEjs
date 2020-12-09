var express = require('express');
const { use } = require('passport/lib');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  console.log(req.isAuthenticated());
  const userData = req.user;

  // 取得したユーザデータを確認したい場合は以下のコメント解除
  // if(userData !== undefined){
  //   console.log(userData);   
  // }

  res.render('index', { title: 'Express', user : req.user });
});

module.exports = router;
