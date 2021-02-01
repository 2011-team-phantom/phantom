const router = require("express").Router();
const user = require("../db/models/users");
const db = require("../db");
const mongoose = require("mongoose");
module.exports = router;
const BCrypt = require("bcrypt-nodejs");
const { session } = require("passport");

//session logger for debugging
router.use((req, res, next) => {
  console.log("SESSION --> ", req.session);
  next();
});

router.post("/login", async (req, res, next) => {
  try {
    const user1 = await user.findOne({ email: req.body.email });
    if (!user1) {
      console.log("No such user found:", req.body.email);
      res.status(401).send("Wrong username and/or password");
    }
    // else if (!user1.validPassword(req.body.password)) {
    //   console.log("Incorrect password for user:", req.body.email);
    //   res.status(401).send("Wrong username and/or password");
    // }
    else {
      req.login(user1, (err) => (err ? next(err) : res.json(user1)));
      res.end();
    }
  } catch (err) {
    console.log("sessionerr", err);
    next(err);
  }
});

router.post("/signup", async (req, res, next) => {
  try {
    const newUser = await new user(req.body);
    newUser.password = newUser.generateHash(newUser.password);
    await newUser.save();
    req.login(newUser, (err) => (err ? next(err) : res.json(newUser)));
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      res.status(401).send("User already exists");
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
