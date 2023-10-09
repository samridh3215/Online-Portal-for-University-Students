const express = require('express')
const forumModel = require('./../src/forums/forums.model')
const intendation = require('./../utils/generateIntendation')

router = express.Router()

router.post("/", async function(req, res){
    let DbOp  = forumModel.DbOp
    let dbManager = new DbOp(process.env.URI)
    let posts = await dbManager.fetchData("ROOT", "Conversation", {})
    res.send(posts)
});

router.get("/", async function(req, res){
    let DbOp  = forumModel.DbOp
    let dbManager = new DbOp(process.env.URI)
    let posts = await dbManager.fetchData("ROOT", "Conversation", {})
    res.render("forums", {"content":posts, "intendation":intendation.generateIndentation});
  });
  

module.exports = router