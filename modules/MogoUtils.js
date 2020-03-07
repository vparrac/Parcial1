const { MongoClient } = require("mongodb");


const url = process.env.MONGODB_URI || "mongodb+srv://monitoring_user:12345@cluster0-xxoke.mongodb.net/test?retryWrites=true&w=majority";
function MongoUtils() {
  mu = {};
  mu.getAllDatabases = () => {
    const client = new MongoClient(url, { useUnifiedTopology: true });
    return client
      .connect()
      .then(client => {
        return client
          .db()
          .admin()
          .listDatabases();
      })
      .finally(() => client.close());
  };

  /**
   * Codigo tomado de
   * https://stackoverflow.com/questions/30470415/listing-all-collections-in-a-mongo-database-within-a-nodejs-script/60547098#60547098
   */

  mu.getAllCollections = dbName => {
    const client = new MongoClient(url, { useUnifiedTopology: true });
    return client
      .connect()
      .then(client => {
        return client
          .db(dbName)
          .listCollections()
          .toArray(); // Returns a promise that will resolve to the list of the collections
      })
      .finally(() => client.close());
  };

  mu.getAllData = (dbName, collection) => {
    const client = new MongoClient(url, { useUnifiedTopology: true });
    return client
      .connect()
      .then(client => {
        
        return client
          .db(dbName)
          .collection(collection)
          .find({})
          .limit(20)
          .toArray();
      })
      .finally(() => client.close());
  };


  mu.insertOneDoc = (doc, dbName,dbCollection) =>{
    console.log(dbName);
    const client = new MongoClient(url, { useUnifiedTopology: true });
    return client.connect().then(client => {
      const gradesCol = client.db(dbName).collection(dbCollection);
      return gradesCol.insertOne(doc).finally(() => client.close());
    });
  };

  return mu;
}

module.exports = MongoUtils();
