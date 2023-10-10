const express = require('express')
const forumModel = require('./../src/forums/forums.model')
const intendation = require('./../utils/generateIntendation');
const winston = require('winston')

const logger = winston.createLogger({
                          level:'info',
                          transports: [new winston.transports.File({filename:'info.json'})]
                        })

router = express.Router()

router.post("/", async function(req, res){
    let DbOp  = forumModel.DbOp
    let dbManager = new DbOp(process.env.URI)
    let result = await dbManager.uploadData("ROOT", "Conversation", req.body)
    console.log(result)
    if(result.acknowledged == true)
      res.json({status_code: 200})
    else
      res.josn({status_code: 500})

});

router.get("/", async function(req, res){
    let DbOp  = forumModel.DbOp
    let dbManager = new DbOp(process.env.URI)
    let posts = await dbManager.fetchData("ROOT", "Conversation", {})
    res.render("forums", {"content":posts, "intendation":intendation.generateIndentation});
    // logger.info(posts)

  });
  

module.exports = router