// routes/complaintsRoute.js
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
// Connect to MongoDB
mongoose.connect(process.env.URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Check if the connection is successful
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
    console.log('Connected to the MongoDB database.');
});
const user = db.collection('users')

// Define the Complaint schema
const complaintSchema = new mongoose.Schema({
    fname: String,
    lname: String,
    email: String,
    phone: String,
    sem: String,
    sec: String,
    issues: {
        type: String,
        required: true
    }
});

// Define the Complaint model
const Complaint = mongoose.model('Complaint', complaintSchema);  
// Define the User model

// GET request to render the complaints form
router.get('/', function(req, res) {
    if(req.isAuthenticated()){
        if(type=="Teacher"){
            res.redirect('/login/addressComplaints')
        }
        else{
    res.render('complaints');
        }
    }else{
        res.redirect('/login/')
    }
});

// POST request to handle form submission
router.post('/', async function(req, res) {
    console.log('POST request to /complaints received');
    
if(req.isAuthenticated()){

    const { issues } = req.body;
    
    try {
        const lastUser = await user.findOne({username:username});

        if (lastUser) {
            const newComplaint = new Complaint({
                fname: lastUser.fname,
                lname: lastUser.lname,
                email: lastUser.email,
                phone: lastUser.phone,
                sem: lastUser.details.sem,
                sec: lastUser.details.sec,
                issues: issues
            });

            // Save the new complaint to the database
            await newComplaint.save();
            res.send('Complaint successfully saved.');
            
        } else {
            // No user found, handle accordingly
            console.error('No user found.');
            res.send('No user found.');
        }
    } catch (err) {
        console.error(err);
        // Handle the error and render an error page
        res.send('Error saving the complaint.');
    }
}else{
    res.send("LOG IN TO POST")
}
});

module.exports = router;
