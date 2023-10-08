const { MongoClient, ServerApiVersion } = require('mongodb');

exports.fetchDataFromDb = async () => {
    const uri = process.env.URI
    const client = new MongoClient(uri, {
                                        serverApi: {
                                          version: ServerApiVersion.v1,
                                          strict: true,
                                          deprecationErrors: true,
                                        }
                                        });

    try {
      await client.connect();
      const db = client.db("ROOT")
      const collection  = db.collection('Conversation')
      let result  = await collection.find({}).toArray()
      console.log(result)
      return result 

    //   await client.db("admin").command({ ping: 1 });
    //   console.log("Pinged your deployment. You successfully connected to MongoDB!");

    } 
    catch{
        console.log("something went wrong")
    }
    finally {
      await client.close();
    }
}
      
