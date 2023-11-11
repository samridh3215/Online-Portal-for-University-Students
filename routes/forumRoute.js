const express = require('express')
const forumModel = require('./../src/forums/forums.model')
const intendation = require('./../utils/generateIntendation');
const winston = require('winston');
const ObjectId = require('mongodb').ObjectId


router = express.Router()

router.post("/", async function(req, res){
    let DbOp  = forumModel.DbOp
    let dbManager = new DbOp(process.env.URI)
    let result = await dbManager.uploadData("ROOT", "Conversation", req.body)
    if(result.acknowledged == true)
      res.json({status_code: 200})
    else
      res.josn({status_code: 500})

});

router.get("/", async function(req, res){
    let DbOp  = forumModel.DbOp
    let dbManager = new DbOp(process.env.URI)
    let posts = await dbManager.fetchData("ROOT", "Conversation", {})
    res.render("forums/forums", {"content":posts, "intendation":intendation.generateIndentation});
    // logger.info(posts)

  });

router.get("/:id", async (req, res)=>{

  let postID = req.params.id
  // console.log(postID)
  let DbOp  = forumModel.DbOp
  let dbManager = new DbOp(process.env.URI)
  let post = await dbManager.fetchOne("ROOT", "Conversation", {_id: new ObjectId(postID)})
  // console.log(post)
  res.render("forums/post", {"content":post, "intendation":intendation.generateIndentation});
})

router.get('/search/:query', async (req, res)=>{
  let query = req.params.query
  let DbOp  = forumModel.DbOp
  let dbManager = new DbOp(process.env.URI) 
  let result = await dbManager.fuzzySearch('ROOT', 'Conversation', query)
  res.json({status_code: 200, data: result});
})

router.post('/updateComments', async (req, res)=>{
  let postID = req.body.postID
  let commentObject = req.body.commentObject
  console.log(postID, commentObject)
  let DbOp = forumModel.DbOp
  let dbManager = new DbOp(process.env.URI)
  let result = await dbManager.updateData('ROOT', 'Conversation', {$push: {"replies": commentObject}}, postID)
  res.json({status_code:200, status: result})
})

  

module.exports = router 