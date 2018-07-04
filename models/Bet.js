const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BetSchema = new Schema({
    name: String,
    owner: Schema.Types.ObjectId,
    oracle: Schema.Types.ObjectId,
    betters: [Schema.Types.ObjectId],
    possibleOutcomes: [Number],
    outcome: Number,
    finished: Boolean,
    betAmounts: {
        type: Map,
        of: Number
    },
    userBets: {
        type: Map,
        of: Schema.Types.ObjectId
    }
});

module.exports = mongoose.model('Bet', BetSchema);
