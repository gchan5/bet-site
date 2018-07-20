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

    app.post('/api/users', (req, res) => {
        const {
            username,
            password,
            balance,
            wins,
            losses,
            activeBets,
            ownedBets,
            oracledBets
        } = req.body;

        const user = new User({
            username,
            password,
            balance,
            wins,
            losses,
            activeBets,
            ownedBets,
            oracledBets
        });

        var userId;

        user.save(function(err, user) {
            userId = user._id;
        });

        res.sendStatus(200);
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
