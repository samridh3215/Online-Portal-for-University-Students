//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const path = require('path');
require('dotenv').config();
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');

const app = express();

//app.use('/home', express.static('static'))
app.use('/forum',express.static("static"));
app.use('/payment',express.static("static"));
app.use('/results',express.static("static"));
app.use('/attendance',express.static("static"));
app.use('/resources', express.static('static'));
app.use('/login', express.static('static'));
app.use('/admin',express.static("static"))


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

//app.use('/home', require('./routes/homeRoute'))
// app.use('/forum', require('./routes/forumRoute'))
app.use('/payment', require('./routes/paymentRoute'))
app.use('/results', require('./routes/resultsRoute'))
app.use('/attendance', require('./routes/attendanceRoute'))
app.use('/resources', require('./routes/resourcesRoute'))
app.use('/login', require('./routes/loginRoute'))
app.use('/admin', require('./routes/adminRoute'))


app.get('/', (req, res)=>{
  res.redirect('/login')
})





const host = '0.0.0.0'
const port = 3000
app.listen(port, host,function() {
  console.log("Server listening on", host, "and", port);
});
