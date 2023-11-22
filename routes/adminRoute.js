require('dotenv').config();
const express = require('express')
const mongoose =require("mongoose");
const bodyParser = require("body-parser");
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const _ = require('lodash');
const axios = require('axios');
router  = express.Router()


const fetchAllPaymentsUrl = 'https://api.razorpay.com/v1/payments';

// Set up basic authentication header with your API key credentials
const authHeader = {
  auth: {
    username: process.env.KEY_ID,
    password: process.env.KEY_SECRET
  }
};


function fetchAllPayments() {
    try {
     
      axios.get(fetchAllPaymentsUrl, authHeader).then(function (response) {
        console.log("hello",response.data);
        return response.data
      })
      .catch(function (error) {
        console.log(error);
      });
      
  
      //console.log('All Payments:', payments.items);
     
    } catch (error) {
      console.error('Error fetching payments:', error.response ? error.response.data : error.message);
      throw error;
    }
}


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

const userSchema2 = new mongoose.Schema({
    title: String,
    amount: Number,
})

userSchema.plugin(passportLocalMongoose);


const User = new mongoose.model("Users",userSchema,'users');
const Pay = new mongoose.model("Pay",userSchema2,'payments');

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//let people=[{"name": "Sakshi", "email":"sakshi@email.com"},{"name": "Samridh", "email":"sam@email.com"}];

router.get("/", async(req, res)=>{
    try {
        const data = await User.find(); 
        res.render('admin', { data:data }); 
      } catch (error) {
        console.log('Error fetching data');
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

router.get('/pay', async(req, res)=>{
    const list= await Pay.find();
    res.render('addPayment',{list: list})
})

router.post('/pay', async(req, res)=> {
    try {
      const newPayment = new Pay({
        title: req.body.title,
        amount: req.body.amount
      });
      newPayment.save().then(async() => {
        const list = await Pay.find();
        res.render("addPayment",{list: list});
      }).catch((err) => {
        console.log(err);
      });
    } catch (error) {
      res.status(500).send('Error saving payment data');
    }
  });

// router.get('https://api.razorpay.com/v1/payments/',function(req,res){
//     res.send(req)
// })



router.get('/transactions', async(req,res)=>{
// Call the function to fetch all payments
axios.get(fetchAllPaymentsUrl, authHeader).then(function (response) {
    //console.log("hello",response.data);
    //return response.data
    res.render("transaction",{paymentdata: response.data.items});
  })
  .catch(function (error) {
    console.log(error);
  });
    // paymentdata= await fetchAllPayments();
    //console.log(paymentdata)
    
})

router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/login');
    });
  });


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