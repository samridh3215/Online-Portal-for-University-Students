require('dotenv').config();
const express = require('express')
const Razorpay = require('razorpay');
router  = express.Router()

router.get("/", function(req, res){
    res.render("payment");
});




module.exports = router