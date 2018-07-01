const userRoutes = require('./UserRoutes');
const betRoutes = require('./BetRoutes');

module.exports = function(app) {
    userRoutes(app);
    betRoutes(app);
}
