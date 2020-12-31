var express = require('express');
const { use } = require('passport/lib');
var router = express.Router();
const todo = require('../models').todo_items;

router.get('/', function(req, res, next) {

    const user = req.user;

    if (req.isAuthenticated()) { // 認証済
        todo.findAll({
                where: {
                    user_id: user.id,
                    delete: false
                }
            })
            .then(todo => {
                res.render('todo', { title: 'TODO', user: user, todo: todo });

            })
            .catch(error => { // エラー処理
                console.log(error);
            });
    } else { // 認証されていない
        res.redirect('/login'); // ログイン画面に遷移
    }
});

// Crate
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
                    res.redirect('/TodoList');
                })

            })
            .catch(error => { // エラー処理
                console.log(error);
            });
    } else { // 認証されていない
        res.redirect('/login'); // ログイン画面に遷移
    }
});

// Update
router.get('/Update/:seq', function(req, res, next) {

    if (req.isAuthenticated()) { // 認証済
        const user = req.user;
        const todo_seq = req.params.seq;

        todo.findOne({
            where: {
                user_id: user.id,
                seq: todo_seq
            }
        }).then(target => {

            res.render('todoUpdate', { title: 'TodoUpdate', user: user, todo: target });
        }).catch(error => { // エラー処理
            console.log(error);
        });

    } else { // 認証されていない
        res.redirect('/login'); // ログイン画面に遷移
    }
});

router.post('/Update/:id', function(req, res, next) {

    const user = req.user;
    const todo_id = req.params.id;
    const now = new Date();

    todo.update({
        todo: req.body['todo'],
        updatedAt: now
    }, {
        where: {
            id: todo_id
        }
    }).then(resurl => {
        res.redirect('/TodoList');
    }).catch(error => { // エラー処理
        console.log(error);
    });
});

// Check
router.post('/Check', function(req, res, next) {

    const user = req.user;
    const todo_seq = req.body.seq;
    const now = new Date();

    todo.findOne({
        where: {
            user_id: user.id,
            seq: todo_seq
        }
    }).then(target => {

        // 現在のdoneの値
        var done_flag = target.done;

        todo.update({
            done: !done_flag,
            updatedAt: now
        }, {
            where: {
                id: target.id
            }
        }).then(resurl => {
            res.redirect('/TodoList');
        }).catch(error => { // エラー処理
            console.log(error);
        });
    })
});

// Delete
router.post('/Delete/:id', function(req, res, next) {

    const user = req.user;
    const todo_id = req.params.id;
    const now = new Date();

    todo.update({
        delete: true,
        updatedAt: now
    }, {
        where: {
            id: todo_id
        }
    }).then(resurl => {
        res.redirect('/TodoList');
    }).catch(error => { // エラー処理
        console.log(error);
    });
});

module.exports = router;