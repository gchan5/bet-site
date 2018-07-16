const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    balance: Number,
    wins: Number,
    losses: Number,
    activeBets: [Schema.Types.ObjectId],
    ownedBets: [Schema.Types.ObjectId],
    oracledBets: [Schema.Types.ObjectId],
    pastBets: [Schema.Types.ObjectId]
});

UserSchema.pre('save', function(next) {
    var user = this;

    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(user.password, salt, function(err, hash) {
            user.password = hash;
            next();
        });
    });
});

module.exports = mongoose.model('User', UserSchema);
