const userRoutes = require('./UserRoutes');
const betRoutes = require('./BetRoutes');
const errorHandlers = require('./ErrorHandlers');

module.exports = function(app) {
    userRoutes(app);
    betRoutes(app);
    errorHandlers(app);
}
