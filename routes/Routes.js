const userRoutes = require('./UserRoutes');
const betRoutes = require('./BetRoutes');
const authenticationRoutes = require('./AuthenticationRoutes');
const errorHandlers = require('./ErrorHandlers');

module.exports = function(app) {
    userRoutes(app);
    betRoutes(app);
    authenticationRoutes(app);
    errorHandlers(app);
}
