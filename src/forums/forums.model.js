
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

  async aggregateData(databaseName, collectionName, query){
    try{
      const db = this.client.db(databaseName)
      const collection  = db.collection(collectionName)
      let result  = await collection.aggregate([{$sort:{date:-1}}]).toArray()
      return result 
    }catch(err){
      console.log("IN DataBaseOperation.fetchData", err)
      throw(err)
    }finally{
      await this.client.close()
    }
  }
  async fetchOne(databaseName, collectionName, query){
    try{
      await this.client.connect();
      const db = this.client.db(databaseName)
      const collection  = db.collection(collectionName)
      let result  = await collection.findOne(query)
      return result 
    }catch(err){
      console.log("IN DataBaseOperation.fetchOne", err)
      throw(err)
    }finally{
      await this.client.close()
    }
  }

  async uploadData(databaseName, collectionName, data){
    try{
      await this.client.connect()
      const db = this.client.db(databaseName)
      const collection  = db.collection(collectionName)
      let result = await collection.insertOne(data)
      return result
    }catch(err){
      console.log("IN DataBaseOperation.uploadData", err)
      throw(err)
    }finally{
      await this.client.close()
    }
  }

  async updateData(databaseName, collectionName, data ,idOfData){
    try{
      await this.client.connect()
      const db = this.client.db(databaseName)
      const collection  = db.collection(collectionName)
      await collection.updateOne({"_id":new ObjectId(idOfData)}, data)
    }catch(err){
      console.log("IN DataBaseOperation.updateData", err)
      throw(err)
    }finally{
      await this.client.close()
    }
  }

  async removeData(databaseName, collectionName, idOfData){
    try{
      await this.client.connect()
      const db = this.client.db(databaseName)
      const collection  = db.collection(collectionName)
      await collection.deleteOne({"_id":new ObjectId(idOfData)})
    }catch(err){
      console.log("IN DataBaseOperation.removeData", err)
      throw(err)
    }finally{
      await this.client.close()
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
    }finally{
      await this.client.close()
    }
  }
}