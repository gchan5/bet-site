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
            finished,
            betAmounts,
            outcomeAmounts
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
            finished,
            userBets
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
            bet,
            betAmount,
            outcome
        } = req.body;

        var betId = mongoose.Types.ObjectId(better);
        bet = mongoose.Types.ObjectId(bet);

        Bet.update({ _id: bet }, { $addToSet : { "betters" : betId } }).exec();
        User.update({ _id: betId }, { $addToSet : { "activeBets" : bet } }).exec();

        Bet.findById(bet, function(err, foundBet) {
            foundBet.betAmounts.set(better, betAmount);
            foundBet.userBets.set(outcome.toString(), better);

            if(foundBet.betters.indexOf(betId) !== -1) {
                foundBet.betters.push(betId)
            }

            foundBet.save();
        });

        User.findById(betId, function(err, foundUser) {
            if(foundUser.activeBets.indexOf(bet) !== -1) {
                foundUser.activeBets.push(bet);
            }

            foundUser.balance = foundUser.balance - betAmount;

            foundUser.save();
        });

        res.sendStatus(200);
    });

    app.post('/api/bet/addOracle', (req, res) => {
        var {
            oracle,
            bet
        } = req.body;

        oracle = mongoose.Types.ObjectId(oracle);
        bet = mongoose.Types.ObjectId(bet);

        Bet.update({ _id: bet }, { "oracle" : oracle }).exec();
        User.update({ _id: oracle }, { $addToSet : { "oracledBets" : bet } }).exec();

        res.sendStatus(200);
    })

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

    app.post('/api/bet/chooseOutcome', (req, res) => {
        var {
            user,
            bet,
            outcome
        } = req.body;

        user = mongoose.Types.ObjectId(user);
        bet = mongoose.Types.ObjectId(bet);

        var foundBet = Bet.findById(bet);

        if(!foundBet) {
            res.sendStatus(404);
            return;
        }

        if(foundBet.oracle != user || !foundBet.possibleOutcomes.includes(outcome)) {
            res.sendStatus(404);
            return;
        }


    });
}
