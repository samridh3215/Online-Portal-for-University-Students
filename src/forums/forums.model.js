const { MongoClient, ServerApiVersion } = require('mongodb');

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
    console.log(result)
    await this.client.close();
    return result 
  }
}



      
