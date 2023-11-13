const express = require('express')
const router = express.Router()



router.get("/", function(req, res){
    res.render("home");
});

// router.get("/",function(req,res){
//     if(req.isAuthenticated()){
//         res.render("home");
//     }else{
//         res.redirect("/login");
//     }
// });

module.exports =  router