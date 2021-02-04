const router = require('express').Router();
const User = require('../db/models/users');

router.get('/', function (req, res, next) {
  console.log('connected');
});

router.post('/addbudget', async function (req, res, next) {
  try {
    const budgetUser = await User.updateOne(
      { _id: req.user._id },
      { $set: { budget: req.body } }
    );
    const updatedUser = await User.findOne(
      { _id: req.user._id },
      { budget: 1 }
    );
    console.log('updatedUser?', updatedUser);
    res.send(updatedUser.budget);
  } catch (error) {
    console.log('errorbudgetadding', error);
  }
});

router.get('/budget', async function (req, res, next) {
  try {
    console.log('user**', req.user);
    const user = await User.findOne({ _id: req.user._id });
    console.log('budget***', user);
    res.send(user);
  } catch (error) {
    console.log('errorbudgetgetting', error);
  }
});

router.put('/updatebudget', async function (req, res, next) {
  try {
    console.log('REQ.BODYYY update budget', req.body);
    const user = await User.findOne(
      { _id: '601c65e9975da49e0899d1cf' },
      { budget: 1 }
    );
    const budgetUser = await User.updateOne(
      { _id: '601c65e9975da49e0899d1cf' },
      { $set: { budget: { ...user.budget, ...req.body } } }
    );
    const updatedUser = await User.findOne(
      { _id: '601c65e9975da49e0899d1cf' },
      { budget: 1 }
    );
    console.log('updatedUser?', updatedUser);
    res.send(updatedUser.budget);
  } catch (error) {
    console.log('errorbudgetadding', error);
  }
});

router.use(function (req, res, next) {
  const err = new Error('Not found.');
  err.status = 404;
  next(err);
});

module.exports = router;
