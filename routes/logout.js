var express = require('express');
var router = express.Router();

// ログアウト実行
router.get('/',function(req, res){
    req.logout();
    res.redirect('/');
  });

module.exports = router;