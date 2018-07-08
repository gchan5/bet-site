function errorHandler(err, req, res, next) {
    res.status(500).send(err.stack);
}

module.exports = function(app) {
    app.use(errorHandler);
}
