const router = require("express").Router();
const User = require("../db/models/users");
const db = require("../db");
const BCrypt = require("bcrypt-nodejs");
const { session } = require("passport");

//session logger for debugging
router.use((req, res, next) => {
  console.log("SESSION --> ", req.session);
  next();
});

router.post("/login", async (req, res, next) => {
  try {
    const thisUser = await User.findOne({ email: req.body.email });
    if (!thisUser) {
      console.log("No such user found:", req.body.email);
      res.status(401).send("Wrong username and/or password");
    } else if (!thisUser.validPassword(req.body.password)) {
      console.log("Incorrect password for user:", req.body.email);
      res.status(401).send("Wrong username and/or password");
    } else {
      req.login(thisUser, (err) => (err ? next(err) : res.json(thisUser)));
      res.end();
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
    });
    newUser.password = newUser.generateHash(newUser.password);
    await newUser.save();
    req.login(newUser, (err) => (err ? next(err) : res.json(newUser)));
  } catch (err) {
    if (err.name === "MongoError") {
      res.status(401).send(`${err.name} user already exists`);
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

router.get("/me", (req, res) => {
  res.json(req.user);
});

router.put("/updateAccess", async (req, res) => {
  console.log("inside update access route");
  try {
    const thisUser = await User.findOne({ email: req.body.user.email });
    thisUser.accessToken.push(req.body.access_token);
    await thisUser.save();
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
