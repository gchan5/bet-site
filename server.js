const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const routes = require('./routes/Routes');
const config = require('./config.json');

const app = express();
const port = 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: config.sessionSecret,
    resave: true,
    saveUninitialized: false
}));

mongoose.connect('mongodb://' + config.user + ':' + config.password + '@' + config.address);

mongoose.connection.once('open', () => {
    console.log("Connected to database");
});

routes(app);

app.get('/', (req, res) => {
    res.send(`<h1>My first Express Api</h1>`);
});

app.listen(port, () => {
    console.log('We are live on ' + port);
});
