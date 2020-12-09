var express = require('express');
var router = express.Router();
const passport = require('../auth'); // 認証機能

// ログインフォーム
router.get('/', (req, res) => {
    res.render('login', {test:"何か渡すなら定義"});
  });
  
  // ログイン実行
  router.post('/',
    passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/login',
      session: true //sessionを有効にする
    })
  );

module.exports = router;