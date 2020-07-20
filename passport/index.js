const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');
const { User } = require('../models');

const users = {};

module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        if(users[id]) {
            done(null, users[id]);
        } else {
            User.findOne({ where: { id } })
            .then(user => {
                users[id] = user;
                done(null, user);
            })
            .catch(err => done(err));
        }
    });

    local(passport);
    kakao(passport);
}