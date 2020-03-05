const { MongoClient } = require("mongodb");

const url = "mongodb://localhost:27017" || process.env.MONGODB_URI;
function MongoUtils() {
  mu = {};

  /**
   * Código tomado https://stackoverflow.com/questions/16571021/how-to-list-all-mongodb-databases-in-node-js/60546171#60546171
   */
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
}

module.exports = MongoUtils();
