const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

// Connection URL
const url = "mongodb://localhost:27017";

// Database Name
const dbName = "phantomdb";

// Create a new MongoClient
const db = new MongoClient(url);

// Use connect method to connect to the Server
db.connect(function (err) {
  assert.equal(null, err);
  console.log(`Connected successfully to server, ${dbName}`);

  const db2 = db.db(dbName);
  db2
    .collection("users")
    .find()
    .toArray(function (err, result) {
      if (err) throw err;

      console.log(result);
    });
  console.log(db2);
  //   db.close();
});
module.exports = db;
