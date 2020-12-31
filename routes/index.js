var express = require('express');
const { use } = require('passport/lib');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    const userData = req.user;

    // 認証状態(認証済：True/未認証：False)
    // console.log(req.isAuthenticated());

    // 取得したユーザデータを確認したい場合は以下のコメント解除
    // if(userData !== undefined){
    //   console.log(userData);   
    // }

    // Sessionを確認したい場合は以下のコメント解除
    // if (req.session != undefined) {
    //     console.log('sessionのログ');
    //     console.log(req.session);
    // }

    res.render('index', { title: 'Express', user: req.user });
});

module.exports = router;