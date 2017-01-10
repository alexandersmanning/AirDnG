const express = require('express');
// const MongoClient = require('monodb').MongoClient;
const index = require('./routes/index');
const app = express();

app.listen(3000)

app.use("/styles",  express.static(__dirname + '/assets/stylesheets/'));
app.use("/scripts", express.static(__dirname + '/lib/'));
app.use("/images",  express.static(__dirname + '/assets/images/'));
app.use('/', index);

module.exports = app;