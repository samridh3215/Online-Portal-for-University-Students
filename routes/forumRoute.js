const express = require('express')
const forumModel = require('./../src/forums/forums.model')
const intendation = require('./../utils/generateIntendation');
const bodyParser = require('body-parser')
const session = require('express-session');
const passport = require('passport');
const ObjectId = require('mongodb').ObjectId

var tags = ['DBMS', 'MI', 'CNS', 'GT', 'AC', 'BD', 'DA', 'HCI', 'SE', 'IOT', 'SEM5', 'SEM4', 'SEM3', 'CSE', 'ECE']


router = express.Router()

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

router.post("/", async function(req, res){
  if(req.isAuthenticated()){

      let DbOp  = forumModel.DbOp
      let dbManager = new DbOp(process.env.URI)
      // username variable has email 

      let userInfo = await dbManager.fetchOne('ROOT', 'users', {"email":email})
      req.body["author"] =  { "email":email, "username": userInfo['username'], 'fname':userInfo['fname']}
      let result = await dbManager.uploadData("ROOT", "Conversation", req.body)
      if(result.acknowledged == true)
        res.json({status_code: 200})
      else
        res.josn({status_code: 500})
    }else{
      res.redirect("/login");
  }

});

router.get("/", async function(req, res){
  if(req.isAuthenticated()){
    let DbOp  = forumModel.DbOp
    let dbManager = new DbOp(process.env.URI)
    let posts = await dbManager.aggregateData("ROOT", "Conversation", {$sort:{date:-1}})
    res.render("forums/forums",{"email":email, "content":posts, 'tags':tags});
  }else{
      res.redirect("/login");
  }
   
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

router.post('/delete', async (req, res)=>{
  let postID = req.body.postID
  let DbOp  = forumModel.DbOp
  let dbManager = new DbOp(process.env.URI) 
  let result = await dbManager.removeData('ROOT', 'Conversation', postID)
  res.json({status_code: 200, data: result})
})

router.post('/updateComments', async (req, res)=>{
  if(req.isAuthenticated()){
  let postID = req.body.postID
  let commentObject = req.body.commentObject
  commentObject["author"]={"name":fname, "SRN":username}
  console.log(postID, commentObject)
  let DbOp = forumModel.DbOp
  let dbManager = new DbOp(process.env.URI)
  let result = await dbManager.updateData('ROOT', 'Conversation', {$push: {"replies": commentObject}}, postID)
  res.json({status_code:200, status: result})
  }
  else{
    res.redirect("/login");
  }
})

  

module.exports = router 