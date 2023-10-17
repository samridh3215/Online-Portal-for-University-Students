const { MongoClient, ServerApiVersion } = require('mongodb');
const ObjectId = require('mongodb').ObjectId

exports.DbOp = class DataBaseOperations{
  constructor(uri){
    this.uri = uri
    this.client = new MongoClient(this.uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
      });
  }

  async fetchData(databaseName, collectionName, query){
    try{
      await this.client.connect();
      const db = this.client.db(databaseName)
      const collection  = db.collection(collectionName)
      let result  = await collection.find(query).toArray()
      await this.client.close();
      return result 
    }catch(err){
      console.log("IN DataBaseOperation.fetchData", err)
      throw(err)
    }
  }
  async fetchOne(databaseName, collectionName, query){
    try{
      await this.client.connect();
      const db = this.client.db(databaseName)
      const collection  = db.collection(collectionName)
      let result  = await collection.findOne(query)
      await this.client.close();
      return result 
    }catch(err){
      console.log("IN DataBaseOperation.fetchOne", err)
      throw(err)
    }
  }

  async uploadData(databaseName, collectionName, data){
    try{
      await this.client.connect()
      const db = this.client.db(databaseName)
      const collection  = db.collection(collectionName)
      let result = await collection.insertOne(data)
      await this.client.close()
      return result
    }catch(err){
      console.log("IN DataBaseOperation.uploadData", err)
      throw(err)
    }
  }

  async updateData(databaseName, collectionName, data ,idOfData){
    try{
      await this.client.connect()
      const db = this.client.db(databaseName)
      const collection  = db.collection(collectionName)
      collection.updateOne({"_id":new ObjectId(idOfData)}, data)
    }catch(err){
      console.log("IN DataBaseOperation.updateData", err)
      throw(err)
    }
  }

  async fuzzySearch(databaseName, collectionName, query) {
    try {
      await this.client.connect();
      const db = this.client.db(databaseName);
      const collection = db.collection(collectionName);
      let escapedRegexp = query.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
      let finalRegex = new RegExp(`.*\\b${escapedRegexp}\\b.*`, 'i');
      let result = await collection.find({$or: [{ "query": { $regex: finalRegex } }, 
                                                { "title": { $regex: finalRegex } }]
                                              }).toArray();      
      return result;
    } catch(err){
      console.log("IN DataBaseOperation.fuzzySearch", err)
      throw(err)
    }
  }
}



      
