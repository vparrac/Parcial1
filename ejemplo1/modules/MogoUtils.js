const { MongoClient, ObjectId } = require("mongodb");

const url = "mongodb://localhost:27017" || process.env.MONGODB_URI;
let db;
//const dbName = "rucAssistantDB";

function MongoUtils() {
  mu = {};

  /**
   * Código tomado https://stackoverflow.com/questions/16571021/how-to-list-all-mongodb-databases-in-node-js/60546171#60546171
   */
  mu.getAllDatabases = callback =>
    MongoClient.connect(url, { useUnifiedTopology: true }).then(client => {
      client
        .connect()
        .then(
          client =>
            client
              .db()
              .admin()
              .listDatabases() // Returns a promise that will resolve to the list of databases
        )
        .then(dbs => {
          callback(dbs);
        })
        .finally(() => client.close());
    });


    /**
     * Codigo tomado de
     * https://stackoverflow.com/questions/30470415/listing-all-collections-in-a-mongo-database-within-a-nodejs-script/60547098#60547098
     */

  mu.getAllCollections = (dbName, callback) =>
    MongoClient.connect(url, { useUnifiedTopology: true }).then(client => {
      client
        .connect()
        .then(
          client =>
            client
              .db(dbName)
              .listCollections()
              .toArray() // Returns a promise that will resolve to the list of the collections
        )
        .then(cols => callback(cols))
        .finally(() => client.close());
    });

  mu.insertOneDoc = (doc, dbCollection, dbName, callback) => {
    MongoClient.connect(url, { useUnifiedTopology: true }).then(
      async client => {
        db = client.db(dbName);
        const collection = db.collection(dbCollection);
        collection.insertOne(doc, (err, docs) => {
          if (err) throw err;
          callback(docs);
          client.close();
        });
      }
    );
  };

  mu.insertManyDocs = (docs, dbCollection, dbName, callback) => {
    MongoClient.connect(url, { useUnifiedTopology: true }).then(
      async client => {
        db = client.db(dbName);
        const collection = db.collection(dbCollection);
        collection.insertMany(docs, (err, doc) => {
          if (err) throw err;
          callback(doc);
          client.close();
        });
      }
    );
  };

  mu.getDocs = (dbCollection, dbName, callback) => {
    MongoClient.connect(url, { useUnifiedTopology: true }).then(
      async client => {
        db = client.db(dbName);
        const collection = db.collection(dbCollection);
        const docs = await collection.find({}).toArray();
        callback(docs);
        client.close();
      }
    );
  };

  mu.deleteOneDoc = (doc, dbCollection, dbName, callback) => {
    MongoClient.connect(url, { useUnifiedTopology: true }).then(client => {
      db = client.db(dbName);
      const collection = db.collection(dbCollection);
      return (
        collection.remove(doc),
        (err, res) => {
          if (err) throw err;
          callback(res);
          client.close();
        }
      );
    });
  };

  mu.getDocByQuery = (id, dbCollection, dbName, callback) => {
    MongoClient.connect(url, { useUnifiedTopology: true }).then(
      async client => {
        db = client.db(dbName);
        const collection = db.collection(dbCollection);
        const docs = await collection
          .find({
            _id: ObjectId(id)
          })
          .toArray();
        callback(docs);
        client.close();
      }
    );
  };

  mu.updateDoc = (id, object, dbCollection, callback) => {
    MongoClient.connect(url, { useUnifiedTopology: true }).then(
      async client => {
        db = client.db(dbName);
        const collection = db.collection(dbCollection);
        collection
          .replaceOne(
            {
              _id: ObjectId(id)
            },
            object
          )
          .then(updateDoc => callback(updateDoc))
          .finally(client.close());
      }
    );
  };

  return mu;
}

module.exports = MongoUtils();
