const router = require("express").Router();
const User = require("../db/models/users");

//session logger for debugging
// router.use((req, res, next) => {
//   console.log('SESSION --> ', req.session);
//   next();
// });

router.post("/login", async (req, res, next) => {
  try {
    const thisUser = await User.findOne({ email: req.body.email });
    if (!thisUser) {
      res.status(401).send("Wrong username and/or password");
    } else if (!thisUser.validPassword(req.body.password)) {
      res.status(401).send("Wrong username and/or password");
    } else {
      req.login(thisUser, (err) => (err ? next(err) : res.json(thisUser)));
    }
  } catch (err) {
    console.error("sessionerr", err);
    next(err);
  }
});

router.post("/signup", async (req, res, next) => {
  try {
    const newUser = new User({
      email: req.body.email,
      password: req.body.password,
      dateOfBirth: req.body.dateOfBirth,
      budget: {
        monthlyIncome: req.body.monthlyIncome,
        housingCost: req.body.housingCost,
      },
    });
    newUser.password = newUser.generateHash(newUser.password);
    await newUser.save();
    req.login(newUser, (err) => (err ? next(err) : res.json(newUser)));
  } catch (err) {
    if (err.name === "MongoError") {
      res.status(401).send(`Account ${req.body.email} already exists.`);
    } else {
      next(err);
    }
  }
});

router.post("/logout", (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect("/");
});

router.get("/me", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user._id });
    res.json(user);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
