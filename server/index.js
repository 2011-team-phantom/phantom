const express = require("express");
const plaid = require("plaid");
const path = require("path");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 3000;

function handleError(errorMessage) {
  console.error(errorMessage);
}

const client = new plaid.Client({
  clientID: process.env.PLAID_CLIENT_ID,
  secret: process.env.PLAID_SECRET,
  env: plaid.environments.sandbox,
});

app.get("/link/token/create", async (req, res) => {
  try {
    const response = await client.createLinkToken({
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
    console.log("CLIENT indexjs", client);
    const linkToken = response.link_token;
    res.send(response);
  } catch (error) {
    console.error(error);
  }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.post("/plaid_token_exchange", async (req, res) => {
  const { public_token } = req.body;
  // console.log('BODY', req.body)
  console.log("PUBLIC TOKEN", public_token);
  const { access_token } = await client
    .exchangePublicToken(public_token)
    .catch(handleError);
  console.log("ACCESS TOKEN", access_token);
  const { accounts, item } = await client
    .getAccounts(access_token)
    .catch(handleError);
  // console.log('tokenEXCHANGE', accounts, item);
  // await client.getTransactions(
  //   access_token,
  //   2020 - 12 - 31,
  //   2021 - 01 - 30,
  //   {
  //     count: 250,
  //     offset: 0,
  //   },
  //   function (error, transactionsResponse) {
  //     if (error != null) {
  //       console.log(error);
  //       return res.json({
  //         error,
  //       });
  //     } else {
  //       console.log(transactionsResponse);
  //       res.json(transactionsResponse);
  //     }
  //   }
  // );
  // console.log(transactions);
  res.send(access_token);
});

app.post("/auth/public_token");

app.get("/transactions/:accessToken", async (req, res) => {
  try {
    const data = await client.getTransactions(
      req.params.accessToken,
      "2020-12-01",
      "2021-01-30"
    );
    // console.log(data);
    res.json(data);
  } catch (error) {
    console.error(error);
  }
});

app.use(express.static(path.join(__dirname, "../public")));
app.use("/api", require("./api"));

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
