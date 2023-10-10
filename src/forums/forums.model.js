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
    await this.client.connect();
    const db = this.client.db(databaseName)
    const collection  = db.collection(collectionName)
    let result  = await collection.find(query).toArray()
    await this.client.close();
    return result 
  }
  async fetchOne(databaseName, collectionName, query){
    await this.client.connect();
    const db = this.client.db(databaseName)
    const collection  = db.collection(collectionName)
    let result  = await collection.findOne(query)
    await this.client.close();
    return result 
  }

  async uploadData(databaseName, collectionName, data){
    await this.client.connect()
    const db = this.client.db(databaseName)
    const collection  = db.collection(collectionName)
    let result = await collection.insertOne(data)
    await this.client.close()
    return result

  }
}



      
