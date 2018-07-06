const User = require('./../models/User');
const mongoose = require('mongoose');

module.exports = function(app) {
    app.get('/api/users', (req, res) => {
        User.find({}).then(function(users) {
            res.send(users);
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

    app.post('/api/users/deposit', (req, res) => {
        var {
            amountToAdd,
            user
        } = req.body;

        user = mongoose.Types.ObjectId(bet);
        var foundUser = User.findById();

        foundUser.balance = foundUser.balance + amountToAdd;

        foundUser.save();

        res.sendStatus(200);
    });
}
