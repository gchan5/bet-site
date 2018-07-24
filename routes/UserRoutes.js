const User = require('./../models/User');
const mongoose = require('mongoose');

module.exports = function(app) {
    app.get('/api/users', (req, res) => {
        User.find({}).then(function(users) {
            res.send(users);
        });
    });

    app.get('/api/usernames', (req, res) => {
        User.find({}, "username -_id").then(function(users) {
            res.status(200).send(users);
        });
    });

    app.get('/api/users/:id', (req, res) => {
        User.findById(mongoose.Types.ObjectId(req.params.id)).exec(function(err, user) {
            if(user === null) {
                throw new Error("User " + req.params.id + " could not be found.");
            }
    
            res.send(user);
        });
    });

    app.post('/api/user', (req, res) => {
        const {
            username,
            password
        } = req.body;

        const user = new User({
            username,
            password,
            balance: 0,
            wins: 0,
            losses: 0,
            activeBets: [],
            ownedBets: [],
            oracledBets: []
        });

        user.save(function(err, user) {
            res.status(200).send(user._id);
        });
    });

    // Add currency to user's account
    app.post('/api/users/deposit', (req, res) => {
        var {
            amountToAdd,
            user
        } = req.body;

        user = mongoose.Types.ObjectId(user);
        User.findById(user).exec(function(err, foundUser) {
            foundUser.balance += amountToAdd;
            foundUser.save();
        });

        res.sendStatus(200);
    });
}
