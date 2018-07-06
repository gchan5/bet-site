const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./routes/Routes');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = 8000;


mongoose.connect('mongodb://root:hello123!@ds117111.mlab.com:17111/bet-site-mongo');

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
