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
const Razorpay = require('razorpay')

const app = express();

//app.use('/home', express.static('static'))
app.use('/forum',express.static("static"));
app.use('/payment',express.static("static"));
app.use('/resources', express.static('static'));
app.use('/login', express.static('static'));
app.use('/admin',express.static("static"))


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

//app.use('/home', require('./routes/homeRoute'))
// app.use('/forum', require('./routes/forumRoute'))
app.use('/payment', require('./routes/paymentRoute'))
app.use('/results', require('./routes/resultsRoute'))
app.use('/login', require('./routes/loginRoute'))
app.use('/admin', require('./routes/adminRoute'))


app.get('/', (req, res)=>{
  res.redirect('/login')
})

// const axios = require('axios');

// // Replace 'YOUR_KEY_ID' and 'YOUR_KEY_SECRET' with your Razorpay API key credentials
// const keyId = 'YOUR_KEY_ID';
// const keySecret = 'YOUR_KEY_SECRET';

// // API endpoint for fetching all payments
// const fetchAllPaymentsUrl = 'https://api.razorpay.com/v1/payments';

// // Set up basic authentication header with your API key credentials
// const authHeader = {
//   auth: {
//     username: process.env.KEY_ID,
//     password: process.env.KEY_SECRET
//   }
// };

// // Function to fetch all payments
// async function fetchAllPayments() {
//   try {
//     // Make GET request to fetch all payments
//     const response = await axios.get(fetchAllPaymentsUrl, authHeader);

//     // Handle the response data (payments)
//     const payments = response.data;

//     // Process the payments data as needed
//     console.log('All Payments:', payments.items[0]);
//     return payments;
//   } catch (error) {
//     console.error('Error fetching payments:', error.response ? error.response.data : error.message);
//     throw error;
//   }
// }

// // Call the function to fetch all payments
// fetchAllPayments();




const host = '0.0.0.0'
const port = 3000
app.listen(port, host,function() {
  console.log("Server listening on", host, "and", port);
});
