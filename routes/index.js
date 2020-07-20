const express = require('express');
const router = express.Router();
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

router.get('/', (req, res, nexts) => {
    res.render('main', {
        title: 'NodeBird',
        twits: [],
        user: req.user,
        loginError: req.flash('loginError'),
    })
});

router.get('/profile', isLoggedIn, (req, res, next) => {
    res.render('profile', { title: '내 정보', user: req.user });
});

router.get('/join', isNotLoggedIn, (req, res, next) => {
    res.render('join', {
        title: '회원가입',
        user: req.user,
        joinError: req.flash('joinError'),
    })
});

module.exports = router;