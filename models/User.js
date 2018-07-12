const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: String,
    password: String,
    balance: Number,
    wins: Number,
    losses: Number,
    activeBets: [Schema.Types.ObjectId],
    ownedBets: [Schema.Types.ObjectId],
    oracledBets: [Schema.Types.ObjectId],
    pastBets: [Schema.Types.ObjectId]
});

module.exports = mongoose.model('User', UserSchema);
