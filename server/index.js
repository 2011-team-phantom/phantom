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

function handleError(errorMessage) {
  console.error(errorMessage);
}

const store = new MongoDBStore({
  uri: process.env.MONGODB_URI || "mongodb://localhost:27017/phantomdb",
  collection: "mySessions",
});

// const client = new plaid.Client({
//   clientID: process.env.PLAID_CLIENT_ID,
//   secret: process.env.PLAID_SECRET,
//   env: plaid.environments.sandbox,
// });

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


// app.get('/link/token/create', async (req, res) => {
//   try {
//     const { link_token } = await client.createLinkToken({
//       user: {
//         client_user_id: '123-test-user-id',
//       },
//       client_name: 'Plaid Test App',
//       products: ['auth', 'transactions'],
//       country_codes: ['US'],
//       language: 'en',
//       // webhook: 'https://sample-web-hook.com',
//       account_filters: {
//         depository: {
//           account_subtypes: ['checking', 'savings'],
//         },
//       },
//     });
//     res.send(link_token);
//   } catch (error) {
//     console.error(error);
//   }
// });

// app.post('/plaidTokenExchange', async (req, res) => {
//   try {
//     const user = await db.collection('users').findOne({ _id: req.user._id });
//     const { publicToken } = req.body;

//     if (user.access_token.length) {
//       const { accounts, item } = await client
//         .getAccounts(user.access_token)
//         .catch(handleError);
//       res.send(user.access_token);
//     } else {
//       const { access_token } = await client
//         .exchangePublicToken(publicToken)
//         .catch(handleError);
//       const { accounts, item } = await client
//         .getAccounts(access_token)
//         .catch(handleError);

//       db.collection('users').updateOne(
//         { _id: req.user._id },
//         { $set: { access_token } }
//       );
//       req.user.access_token = access_token;
//       res.send(access_token);
//     }
//   } catch (error) {
//     console.log(error);
//   }
// });

// app.get('/transactions', async (req, res) => {
//   try {
//     const today = new Date();
//     const dd = String(today.getDate()).padStart(2, '0');
//     const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
//     const yyyy = today.getFullYear();

//     const now = yyyy + '-' + mm + '-' + dd;
//     const lastYear = yyyy - 1 + '-' + mm + '-' + dd;

//     console.log('LAST YEAR', lastYear);
//     const data = await client.getTransactions(
//       req.user.access_token,
//       lastYear,
//       now,
//       {
//         count: 500,
//       }
//     );

//     res.json(data);
//   } catch (error) {
//     console.error(error);
//   }
// });

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

// module.exports = client;
