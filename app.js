//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const path = require('path');
const morgan = require('morgan');
require('dotenv').config();
const intendation = require('./utils/generateIntendation')
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("static"));
app.use(morgan('combined'));

const forums = require('./src/forums/forums.model.js')
app.get("/", function(req, res){
  res.render("home");
});

app.get("/forums", async function(req, res){
  let posts = await forums.fetchDataFromDb()
  res.render("forums", {"content":posts, "intendation":intendation.generateIndentation});
});

app.post("/forums", async function(req, res){
  res.send(answer)
});

app.get("/payment", function(req, res){
  res.render("payment");
});

app.get("/results", function(req, res){
  res.render("results");
});

app.get("/attendance", function(req, res){
  res.render("attendance");
});

app.get("/resources", function(req, res){
  res.render("resources");
});

app.post("/test", function(req, res){
  res.send("successful")
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
