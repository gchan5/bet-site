const User = require('./../models/User');

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
}
