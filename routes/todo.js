var express = require('express');
const { use } = require('passport/lib');
var router = express.Router();
const todo = require('../models').todo_items;

router.get('/', function(req, res, next) {

    const user = req.user;

    if (req.isAuthenticated()) { // 認証済
        todo.findAll({
                where: {
                    user_id: user.id
                }
            })
            .then(todo => {

                // todoの中身確認
                //console.log(todo);

                res.render('todo', { title: 'TODO', user: user, todo: todo });

            })
            .catch(error => { // エラー処理

                console.log('エラー');
                console.log('ログインからやり直し');
                console.log(error);
            });
    } else { // 認証されていない
        res.redirect('/login'); // ログイン画面に遷移
    }
});


router.get('/Create', function(req, res, next) {

    if (req.isAuthenticated()) { // 認証済


        res.render('todoCreate', { title: 'TodoCreate', user: req.user });
    } else { // 認証されていない
        res.redirect('/login'); // ログイン画面に遷移
    }
});

router.post('/Create', function(req, res, next) {

    const user = req.user;

    if (req.isAuthenticated()) { // 認証済

        // 連番最大値取得
        todo.findOne({
                where: {
                    user_id: user.id
                },
                order: [
                    ['seq', 'DESC']
                ]
            }).then(target => {
                const todoSeq = target.seq + 1;

                todo.create({
                    user_id: user.id,
                    seq: todoSeq,
                    todo: req.body['todo'],
                    done: false,
                    delete: false
                }).then(resurl => {
                    console.log(resurl);
                    res.redirect('/TodoList');
                })

            })
            .catch(error => { // エラー処理

                console.log('エラー');
                console.log('ログインからやり直し');
                console.log(error);
            });


    } else { // 認証されていない
        res.redirect('/login'); // ログイン画面に遷移
    }
});

module.exports = router;