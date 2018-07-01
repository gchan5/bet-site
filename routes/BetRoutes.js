const Bet = require('./../models/Bet');
const User = require('./../models/User');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = function(app) {
    app.get('/api/bet', (req, res) => {
        Bet.find({}).then(function(bets) {
            res.send(bets);
        });
    });

    app.post('/api/bet', (req, res) => {
        var {
            name,
            owner,
            oracle,
            betters,
            possibleOutcomes,
            outcome,
            finished
        } = req.body;

        owner = mongoose.Types.ObjectId(owner);
        oracle = oracle === "" ? null : mongoose.Types.ObjectId(oracle);
        betters = betters.map(better => mongoose.Types.ObjectId(better));

        const bet = new Bet({
            name,
            owner,
            oracle,
            betters,
            possibleOutcomes,
            outcome,
            finished
        });

        bet.save().then(function(savedBet) {
            User.update({ _id: savedBet.owner}, { $addToSet : { "ownedBets" : savedBet._id } }).exec();

            for(var i = 0; i < betters.length; i++) {
                User.update({ _id: betters[i]}, { "$addToSet" : { "activeBets" : savedBet._id} }).exec();
            }
        });

        res.sendStatus(200);
    });

    app.post('/api/bet/addUser', (req, res) => {
        var {
            better,
            bet
        } = req.body;

        better = mongoose.Types.ObjectId(better);
        bet = mongoose.Types.ObjectId(bet);

        Bet.update({ _id: bet }, { $addToSet : { "betters" : better } }).exec();
        User.update({ _id: better }, { $addToSet : { "activeBets" : bet } }).exec();

        res.sendStatus(200);
    });

    app.post('/api/bet/addUsers', (req, res) => {
        var {
            betters,
            bet
        } = req.body;

        betters = betters.map(better => mongoose.Types.ObjectId(better));
        bet = mongoose.Types.ObjectId(bet);

        betters.forEach(function(better) {
            Bet.findById(this.bet, { $addToSet : { betters : better }});
            User.findById(better, { $addToSet : { ownedBets : this.bet }})
        }, this);

        res.sendStatus(200);
    });

    app.delete('/api/bet', (req, res) => {
        var {
            bet
        } = req.body;

        bet = mongoose.Types.ObjectId(bet);

        Bet.findByIdAndDelete(bet, function(err, betToDelete) {
            var betters = betToDelete.betters;
            User.update({ _id: betToDelete.owner}, { $pull : { "ownedBets" :  betToDelete._id }}).exec();

            for(var i = 0; i < betters.length; i++) {
                User.update({ _id: betters[i] }, { $pull : { "activeBets" :  betToDelete._id }}).exec();
            }
        });

        res.sendStatus(200);
    });
}
