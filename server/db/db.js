//Import the mongoose module
const mongoose = require("mongoose");

//Set up default mongoose connection
const mongoDB = "mongodb://localhost:27017/phantomdb";
mongoose.connect(mongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

//Get the default connection
const db = mongoose.connection;

//log connection
mongoose.connection.on("connected", function () {
  console.log(`Mongoose connection on ${mongoDB}`);
});
//Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));

module.exports = db;
