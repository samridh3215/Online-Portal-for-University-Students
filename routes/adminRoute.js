require('dotenv').config();
const express = require('express')
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

const userSchema = new mongoose.Schema({  //object of mongoose schema
    fname: String,
    lname: String,
    email: String,
    phone: String,
    username: String,
    password: String,
    type: String,
    details: {
    sem: String,
    sec: String
    }
}); 

userSchema.plugin(passportLocalMongoose);


const User = new mongoose.model("Users",userSchema,'users');

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

let people=[{"name": "Sakshi", "email":"sakshi@email.com"},{"name": "Samridh", "email":"sam@email.com"}];

router.get("/", async(req, res)=>{
    try {
        const data = await User.find(); 
        res.render('admin', { data:data }); 
        console.log(people);
      } catch (error) {
        res.send('Error fetching data');
      }
});


router.get("/add",function(req,res){
    res.render('add');
})

router.post("/add",function(req,res){
    User.register({fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        phone: req.body.num,
        username:req.body.username,
        type: req.body.type,
        details: {
        sem: req.body.sem,
        sec: req.body.sec
        }},req.body.password,(err,user)=>{
                if(err){
                    console.log(err);
                    res.redirect("/admin/add");
                }else{
                    passport.authenticate("local")(req,res,()=>{
                        res.redirect("/admin");
                        username= req.user.username;
                    })
                    const user={
                        name: req.body.fname,
                        email: req.body.email
                    };
                    people.push(user);
                    console.log(people)
                }
            })
})

router.get("/:fname",async function(req,res){
    const requestedUser = await User.findOne({fname:req.params.fname})
    res.render("user", {fname:requestedUser.fname, email:requestedUser.email})
    // var requestedTitle = _.lowerCase(req.params.fname);
    // people.forEach(function(user){
    //   var storedTitle= _.lowerCase(user.name);
    //   if(requestedTitle === storedTitle){
    //     res.render("user",{fname: user.name,email: user.email});
    //   }
    // })
  })



module.exports = router