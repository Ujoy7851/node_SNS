const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('./middlewares');
const { User } = require('../models');

router.post('/:id/follow', isLoggedIn, async (req, res, next) => {
    try {
        const user = await User.findOne({ where: { id: req.user.id }});
        if(user) {
            await user.addFollowing(parseInt(req.params.id, 10));
            res.redirect('/');
        } else {
            res.status(404).send('no user');
        }
    } catch(error) {
        console.error(error);
        next(error);
    }
})

module.exports = router;