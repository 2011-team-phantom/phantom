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
    console.log(client)
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
  const { publicToken } = req.body;
  const { access_token } = await client
    .exchangePublicToken(publicToken)
    .catch(handleError);
  const { accounts, item } = await client
    .getAccounts(access_token)
    .catch(handleError);
  console.log(accounts, item);
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
