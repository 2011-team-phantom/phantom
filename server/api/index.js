const router = require('express').Router();

router.get('/', function (req, res, next) {
  console.log('connected');
});

router.use(function (req, res, next) {
  const err = new Error('Not found.');
  err.status = 404;
  next(err);
});

module.exports = router;
