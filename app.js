//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const path = require('path');
require('dotenv').config();

const app = express();

app.use('/home', express.static('static'))
app.use('/forum',express.static("static"));
app.use('/payment',express.static("static"));
app.use('/results',express.static("static"));
app.use('/attendance',express.static("static"));
app.use('/resources', express.static('static'))

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('combined'));

app.use('/home', require('./routes/homeRoute'))
app.use('/forum', require('./routes/forumRoute'))
app.use('/payment', require('./routes/paymentRoute'))
app.use('/results', require('./routes/resultsRoute'))
app.use('/attendance', require('./routes/attendanceRoute'))
app.use('/resources', require('./routes/resourcesRoute'))

app.get('/', (req, res)=>{
  res.redirect('/home')
})

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
