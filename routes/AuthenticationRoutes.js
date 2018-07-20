const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = require('./../models/User');

module.exports = function(app) {
    app.post('/auth/login', (req, res, next) => {
        const {
            username,
            password
        } = req.body;

        User.findOne({ username: username }).exec(function(err, user) {
            if(err) {
                var error = new Error('Wrong username or password.');
                error.status = 401;
                return next(error);
            } else if (!user) {
                var error = new Error('User not found.');
                error.status = 401;
                return next(error);
            } 
    
            bcrypt.compare(password, user.password, function(err, result) {
                if(result) {
                    req.session.userId = user._id;
                    res.send(user._id);
                } else {
                    var error = new Error('Wrong username or password.');
                    error.status = 401;
                    return next(error);
                }
            })
        });
    });

    app.post('/auth/logout', (req, res) => {
        req.session.userId = null;
        res.sendStatus(200);
    });
}