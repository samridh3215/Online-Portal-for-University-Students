// routes/addresscomplaintsRoute.js
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Assuming you have a Complaint model defined
const Complaint = mongoose.model('Complaint');

router.get('/', async function (req, res) {
    try {
        // Fetch all complaints from the Complaints collection
        let allComplaints = await Complaint.find();

        // Filter complaints based on input from the search bar (sec field)
        const secInput = req.query.sec;
        if (secInput) {
            allComplaints = allComplaints.filter(complaint => complaint.sec.toLowerCase().includes(secInput.toLowerCase()));
        }

        if (allComplaints.length > 0) {
            // Render the addresscomplaints page with filtered complaints and sectionNotFound variable
            res.render('addresscomplaints', { complaints: allComplaints, sectionNotFound: false });
        } else {
            // No complaints found, handle accordingly
            console.error('No complaints found.');
            // Pass sectionNotFound as true since no complaints were found
            res.render('addresscomplaints', { complaints: [], sectionNotFound: true });
        }
    } catch (err) {
        console.error(err);
        // Handle the error and render an error page
        res.send('Error fetching complaints.');
    }
});

module.exports = router;
