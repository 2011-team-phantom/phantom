const router = require('express').Router();
const User = require('../db/models/users');
const db = require('../db');
const dotenv = require('dotenv').config();
const plaid = require('plaid');

function handleError(errorMessage) {
  console.error(errorMessage);
}
const client = new plaid.Client({
  clientID: process.env.PLAID_CLIENT_ID,
  secret: process.env.PLAID_SECRET,
  env: plaid.environments.sandbox,
});

function handleError(errorMessage) {
  console.error(errorMessage);
}

router.get('/', function (req, res, next) {
  console.log('connected');
});

router.get('/linkTokenCreate', async (req, res) => {
  try {
    const { link_token } = await client.createLinkToken({
      user: {
        client_user_id: '123-test-user-id',
      },
      client_name: 'Plutus',
      products: ['auth', 'transactions'],
      country_codes: ['US'],
      language: 'en',
      account_filters: {
        depository: {
          account_subtypes: ['checking', 'savings'],
        },
      },
    });
    res.send(link_token);
  } catch (error) {
    console.error(error);
  }
});

router.post('/plaidTokenExchange', async (req, res) => {
  try {
    const user = await db.collection('users').findOne({ _id: req.user._id });
    const { publicToken } = req.body;

    if (user.access_token.length) {
      const { accounts, item } = await client
        .getAccounts(user.access_token)
        .catch(handleError);
      res.send(user.access_token);
    } else {
      const { access_token } = await client
        .exchangePublicToken(publicToken)
        .catch(handleError);
      const { accounts, item } = await client
        .getAccounts(access_token)
        .catch(handleError);

      db.collection('users').updateOne(
        { _id: req.user._id },
        { $set: { access_token } }
      );
      req.user.access_token = access_token;
      res.send(access_token);
    }
  } catch (error) {
    console.log(error);
  }
});

router.get('/plaidTransactions', async (req, res) => {
  try {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();

    const now = yyyy + '-' + mm + '-' + dd;
    const lastYear = yyyy - 1 + '-' + mm + '-' + dd;

    const data = await client.getTransactions(
      req.user.access_token,
      lastYear,
      now,
      {
        count: 500,
      }
    );

    res.json(data);
  } catch (error) {
    console.error(error);
  }
});

router.post('/budget', async function (req, res, next) {
  try {
    const budgetUser = await User.updateOne(
      { _id: req.user._id },
      { $set: { budget: { ...req.body, ...budgetUser.budget } } }
    );
    const updatedUser = await User.findOne(
      { _id: req.user._id },
      { budget: 1 }
    );
    res.send(updatedUser.budget);
  } catch (error) {
    console.log('Error adding budget:', error);
  }
});

router.get('/budget', async function (req, res, next) {
  try {
    const user = await User.findOne({ _id: req.user._id });
    res.send(user.budget);
  } catch (error) {
    console.log('Error getting budget:', error);
  }
});

router.put('/budget', async function (req, res, next) {
  try {
    const user = await User.findOne({ _id: req.user._id }, { budget: 1 });
    const budgetUser = await User.updateOne(
      { _id: req.user._id },
      { $set: { budget: { ...user.budget, ...req.body } } }
    );
    const updatedUser = await User.findOne(
      { _id: req.user._id },
      { budget: 1 }
    );
    res.send(updatedUser.budget);
  } catch (error) {
    console.log('Error updating budget:', error);
  }
});

router.get('/transaction', async function (req, res, next) {
  try {
    const user = await User.findOne({ _id: req.user._id });
    res.send(user.transaction);
  } catch (error) {
    console.log('Error getting transactions:', error);
  }
});

router.put('/transaction', async function (req, res, next) {
  try {
    const user = await User.findOne({ _id: req.user._id }, { transaction: 1 });
    const transactionUser = await User.updateOne(
      { _id: req.user._id },
      { $set: { transaction: [req.body, ...user.transaction] } }
    );
    const updatedUser = await User.findOne(
      { _id: req.user._id },
      { transaction: 1 }
    );
    res.send(updatedUser.transaction);
  } catch (error) {
    console.log('Error adding transaction:', error);
  }
});

router.use(function (req, res, next) {
  const err = new Error('Not found.');
  err.status = 404;
  next(err);
});

module.exports = router;
