const express = require('express');
const fetch = require('node-fetch');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./routes/Routes');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = 8000;

fetch('web.config').then(response => response.json())
    .then(jsonResponse => function(jsonResponse) {
        mongoose.connect('mongodb://' + jsonReponse.user + ':' + jsonReponse.password + '@' + jsonResponse.address);
    });

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
