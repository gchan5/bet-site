const Bet = require('./../models/Bet');
const User = require('./../models/User');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = function(app) {
    // Get all bets
    app.get('/api/bet', (req, res) => {
        Bet.find({}).then(function(bets) {
            res.send(bets);
        });
    });

    // Get info for specific bet
    app.get('/api/bet/:id', (req, res) => {
        Bet.findById(mongoose.Types.ObjectId(req.params.id)).exec(function(err, bet) {
            if(bet === null) {
                throw new Error("Bet " + req.params.id + " could not be found.");
            }

            res.send(bet);
        });
    });

    // Get all bets of a specific owner
    app.get('/api/bet/owner/:id', (req, res) => {
        var ownerId = mongoose.Types.ObjectId(req.params.id);

        Bet.find({ owner: ownerId }).exec(function(err, bets) {
            res.send(bets);
        });
    });

    // Create a new bet
    app.post('/api/bet', (req, res) => {
        var {
            name,
            owner,
            oracle,
            betters,
            possibleOutcomes,
            outcome,
            finished,
            pot,
            betAmounts,
            userBets
        } = req.body;

        var id;

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
            pot,
            betAmounts,
            userBets
        });

        bet.save().then(function(savedBet) {
            User.update({ _id: savedBet.owner}, { $addToSet : { "ownedBets" : savedBet._id } }).exec();

            for(var i = 0; i < betters.length; i++) {
                User.update({ _id: betters[i]}, { "$addToSet" : { "activeBets" : savedBet._id} }).exec();
            }

            id = savedBet._id;
        });

        res.status(200).send(id);
    });

    // Add a user to a bet
    app.post('/api/bet/addUser', (req, res) => {
        var {
            better,
            bet,
            betAmount,
            outcome
        } = req.body;

        var betId = mongoose.Types.ObjectId(better);
        bet = mongoose.Types.ObjectId(bet);

        Bet.findById(bet, function(err, foundBet) {
            var oldUserBets = foundBet.userBets.get(outcome.toString());

            if(oldUserBets) {
                oldUserBets = oldUserBets.slice();
                oldUserBets.push(better);
                foundBet.userBets.set(outcome.toString(), oldUserBets);
            } else {
                foundBet.userBets.set(outcome.toString(), better);
            }

            foundBet.betAmounts.set(better, betAmount);
            foundBet.pot += betAmount;

            if(foundBet.betters.indexOf(betId) === -1) {
                foundBet.betters.push(betId)
            }

            foundBet.save();
        });

        User.findById(betId, function(err, foundUser) {
            if(foundUser.activeBets.indexOf(bet) === -1) {
                foundUser.activeBets.push(bet);
            }

            foundUser.balance -= betAmount;

            foundUser.save();
        });

        res.sendStatus(200);
    });

    // Add an oracle to a bet
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

    // Delete a bet
    app.delete('/api/bet', (req, res) => {
        var {
            bet
        } = req.body;

        bet = mongoose.Types.ObjectId(bet);

        Bet.findByIdAndDelete(bet, function(err, betToDelete) {
            if(!betToDelete) {
                throw new Error("Bet " + bet.toString() +  " does not exist.");
            }

            User.update({ _id: betToDelete.owner}, { $pull : { "ownedBets" :  betToDelete._id }}).exec();
            User.update({ _id: betToDelete.oracle}, { $pull : { "oracledBets" :  betToDelete._id }}).exec();

            // if we're deleting a bet that has not been finished, return funds to betters
            if(!betToDelete.finished) {
                for(var i = 0; i < betToDelete.betters.length; i++) {
                    User.findById(mongoose.Types.ObjectId(betToDelete.betters[i])).exec(function(err, user) {
                        if(user) {
                            if(user.activeBets.indexOf(bet) > -1) {
                                user.activeBets.splice(user.activeBets.indexOf(bet), 1);
                            }
        
                            user.balance += betToDelete.betAmounts.get(user._id.toString());
                            user.save();
                        }
                    });
                }
            }
        });

        res.sendStatus(200);
    });

    // Choose an outcome for a bet
    app.post('/api/bet/chooseOutcome', (req, res) => {
        var {
            user,
            bet,
            outcome
        } = req.body;

        user = mongoose.Types.ObjectId(user);
        bet = mongoose.Types.ObjectId(bet);

        Bet.findById(bet, function(err, foundBet) {
            var winnings = 0;
            var winningBetTotals = 0;
    
            if(!foundBet) {
                throw new Error("An invalid bet was provided");
            }
    
            if(foundBet.oracle.toString() != user.toString()) {
                throw new Error("The user is not the oracle.");
            }
    
            if(!foundBet.possibleOutcomes.includes(outcome)) {
                throw new Error("The chosen outcome does not exist.");
            }
    
            foundBet.finished = true;
            var keys = foundBet.userBets.keys();
            var key = keys.next();
    
            while(!key.done) {
                console.log("key");
                console.log(key.value);
                if(key.value !== outcome.toString()) {
                    var losers = foundBet.userBets.get(key.value);
                    for(var i = 0; i < losers.length; i++) {
                        console.log("loser");
                        console.log(losers[i]);
                        winnings += foundBet.betAmounts.get(losers[i].toString());
                        User.findById(losers[i]).exec(function(err, loserDoc) {
                            loserDoc.losses = loserDoc.losses + 1;;
                            loserDoc.save();
                        });
                    }
                } else {
                    var winners = foundBet.userBets.get(key.value);
                    for(var i = 0; i < winners.length; i++) {
                        winningBetTotals += foundBet.betAmounts.get(winners[i].toString());
                    }
                }

                key = keys.next();
            }

            var winners = foundBet.userBets.get(outcome.toString());
    
            for(var i = 0; i < winners.length; i++) {
                console.log("winner");
                console.log(winners[i]);
                User.findById(winners[i]).exec(function(err, winnerDoc) {
                    if(winnerDoc) {
                        var selfBalance = foundBet.betAmounts.get(winnerDoc._id.toString());
                        winnerDoc.balance = winnerDoc.balance + ((selfBalance/winningBetTotals) * winnings) + selfBalance;
                        winnerDoc.wins = winnerDoc.wins + 1;
                        winnerDoc.save();
                    }
                });
            }

            foundBet.save();
            res.sendStatus(200);
        });
    });
}
