require('dotenv').config();
const express = require('express')
const Razorpay = require('razorpay');
const mongoose =require("mongoose");
const bodyParser = require("body-parser");
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const _ = require('lodash');
router  = express.Router()

router.use(bodyParser.urlencoded({
    extended: true
}));
router.use(session({
    secret: "Ourlittlesecret.",
    resave: false,
    saveUninitialized: false,
}));

router.use(passport.initialize());
router.use(passport.session());



mongoose.connect(process.env.URI,{useNewUrlParser: true, dbName: 'ROOT'});



const userSchema2 = new mongoose.Schema({
    title: String,
    amount: Number,
})
const Pays = new mongoose.model("Pays",userSchema2,'payments');

router.get("/", async(req, res)=>{
    const list = await Pays.find();
    res.render("payment",{list : list});
});




module.exports = router