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

// const cors = require("cors");

function handleError(errorMessage) {
  console.error(errorMessage);
}

const store = new MongoDBStore({
  uri: "mongodb://localhost:27017/phantomdb",
  collection: "mySessions",
});

const client = new plaid.Client({
  clientID: process.env.PLAID_CLIENT_ID,
  secret: process.env.PLAID_SECRET,
  env: plaid.environments.sandbox,
});

store.on("error", function (error) {
  console.log(error);
});

// app.use(cors({ credentials: true, origin: "localhost:3000" }));
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
    secret: "a wildly insecure secret",
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: { secure: false, _expires: 3600000 },
    credentials: "include",
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/link/token/create", async (req, res) => {
  try {
    const { link_token } = await client.createLinkToken({
      user: {
        client_user_id: "123-test-user-id",
      },
      client_name: "Plaid Test App",
      products: ["auth", "transactions"],
      country_codes: ["US"],
      language: "en",
      webhook: "https://sample-web-hook.com",
      account_filters: {
        depository: {
          account_subtypes: ["checking", "savings"],
        },
      },
    });
    res.send(link_token);
  } catch (error) {
    console.error(error);
  }
});

app.post("/plaid_token_exchange", async (req, res) => {
  try {
    const user = await db.collection("users").findOne({ _id: req.user._id });
    const { public_token } = req.body;

    if (user.access_token.length) {
      const { accounts, item } = await client
        .getAccounts(user.access_token)
        .catch(handleError);
      res.send(user.access_token);
    } else {
      const { access_token } = await client
        .exchangePublicToken(public_token)
        .catch(handleError);
      const { accounts, item } = await client
        .getAccounts(access_token)
        .catch(handleError);
      db.collection("users").updateOne(
        { _id: req.user._id },
        { $set: { access_token } }
      );
      res.send(access_token);
    }
  } catch (error) {
    console.log(error);
  }
});

app.post("/auth/public_token");

app.get("/transactions/:accessToken", async (req, res) => {
  try {
    const data = await client.getTransactions(
      req.params.accessToken,
      "2020-12-01",
      "2021-01-30"
    );

    res.json(data);
  } catch (error) {
    console.error(error);
  }
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

module.exports = client;
