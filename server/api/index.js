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
    res.send(updatedUser.budget);
  } catch (error) {
    console.log('errorbudgetadding', error);
  }
});

router.get('/budget', async function (req, res, next) {
  try {
    const user = await User.findOne({ _id: req.user._id });
    res.send(user);
  } catch (error) {
    console.log('errorbudgetgetting', error);
  }
});

router.put('/updatebudget', async function (req, res, next) {
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
    console.log('errorbudgetadding', error);
  }
});

router.use(function (req, res, next) {
  const err = new Error('Not found.');
  err.status = 404;
  next(err);
});

module.exports = router;
