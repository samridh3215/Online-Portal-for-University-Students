require('dotenv').config();
const express = require('express')
const mongoose =require("mongoose");
const forumRouter = require('./forumRoute');
const bodyParser = require("body-parser");
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const router  = express.Router()

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
    username: String,
    password: String 
}); 

userSchema.plugin(passportLocalMongoose);


const User = new mongoose.model("User",userSchema,'users');

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


router.get("/", function(req, res){
    res.render("login");
});

router.get("/home",function(req,res){
    if(req.isAuthenticated()){
        res.render("home",{fname: fname});
    }else{
        res.redirect("/login");
    }
});

// router.get("/logout", function(req,res){
//     req.logout();
//     res.redirect("/login");
// });

router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/login');
    });
  });

// router.post("/",function(req,res){

//     User.register({username: req.body.username},req.body.password,(err,user)=>{
//         if(err){
//             console.log(err);
//             res.redirect("/login");
//         }else{
//             passport.authenticate("local")(req,res,()=>{
//                 res.redirect("/login/home");
//                 username= req.user.username;
//             })
//         }
//     })
// });


router.post("/",function(req,res){

    const user = new User({
        username: req.body.username,
        password: req.body.password
    });

    req.login(user,function(err){
        if(err){
            console.log(err);
        }else{
            passport.authenticate("local")(req,res,()=>{
                    fname = req.user.fname;
                    username = req.user.username;
                    email = req.user.email
                    
                    if(username === 'admin@email.com'){
                        res.redirect("/admin")
                    }else{
                    res.redirect("/login/home");
                    }
            });
        }
    })
});


router.use('/forum/', forumRouter)
router.use('/forum/',express.static("static"));

module.exports = router