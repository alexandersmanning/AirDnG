require('dotenv').config();
const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const index = require('./routes/index');
// const data = require('./routes/data');
const app = express();

let db; 

MongoClient.connect(process.env.DB, (err, database) => {
  if (err) return console.log(err)
  db = database;
  app.listen(3000, () => {
    console.log('listening on 3000')
  })
})

app.use("/styles",  express.static(__dirname + '/assets/stylesheets/'));
app.use("/scripts", express.static(__dirname + '/lib/'));
app.use("/images",  express.static(__dirname + '/assets/images/'));
app.use('/', index);

app.get('/data/:list', (req, res) => {
	let param_list = {"$or": eval(req.params.list.replace(/\-/g,"\/")) }
	let cursor = db.collection('wordlist')
			.find(param_list)
			.toArray(function(err, results) {
		if (err) { return console.log(err) }
		res.json(results);
	})
})

module.exports = app;