const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = require('./../models/User');

module.exports = function(app) {
    app.post('/login', (req, res, next) => {
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
                    res.sendStatus(200);
                } else {
                    var error = new Error('Wrong username or password.');
                    error.status = 401;
                    return next(error);
                }
            })
        });
    });
}