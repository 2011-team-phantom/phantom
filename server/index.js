const express = require("express");
const plaid = require("plaid");
const path = require("path");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 3000;
const db = require("./db");
const session = require("express-session");
const passport = require("passport");
const MongoDBStore = require("connect-mongodb-session")(session);

const store = new MongoDBStore({
  uri: process.env.MONGODB_URI || "mongodb://localhost:27017/phantomdb",
  collection: "mySessions",
});

store.on("error", function (error) {
  console.log(error);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

passport.serializeUser((user, done) => done(null, user._id));

passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.collection("users").findOne({ _id: id });
    done(null, user);
  } catch (err) {
    done(err);
  }
});

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: { secure: false, _expires: 3600000 },
    credentials: "include",
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/serviceWorker.js", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../serviceWorker.js"));
});

app.use(express.static(path.join(__dirname, "../public")));
app.use("/api", require("./api"));
app.use("/auth", require("./auth"));

app.use("*", function (req, res) {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.listen(port, function () {
  console.log("Knock, knock");
  console.log("Who's there?");
  console.log(`Your server, listening on port ${port}`);
});

app.use(function (err, req, res, next) {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Internal server error.");
});
