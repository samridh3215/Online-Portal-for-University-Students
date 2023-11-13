const forumModel = require('./forums.model')
const DbOp =  forumModel.DbOp
class Post{
    constructor(title, body, user, date){
        this.title = title
        this.body = body
        this.user = user
        this.date = date
        this.obj = {title:this.title, body:this.body, author: this.user, date:this.date}

    }
    async save(){
        let dbManager = new DbOp(process.env.URI)
        let result = await dbManager.uploadData("ROOT", "Conversation", this.obj)
    }
    async remove(){
        
    }
}