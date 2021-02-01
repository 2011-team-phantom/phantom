const router = require("express").Router();
const user = require("../db/models/users");
const db = require("../db");
const mongoose = require("mongoose");
module.exports = router;
const BCrypt = require("bcrypt-nodejs");

router.post("/login", async (req, res, next) => {
  try {
    const user1 = await user.findOne({ email: req.body.email });
    console.log("user", user1);
    if (!user1) {
      console.log("No such user found:", req.body.email);
      res.status(401).send("Wrong username and/or password");
    }
    // else if (!user1.validPassword(req.body.password)) {
    //   console.log("Incorrect password for user:", req.body.email);
    //   res.status(401).send("Wrong username and/or password");
    // }
    else {
      console.log("login?", user1);

      req.login(user1, (err) => (err ? next(err) : res.json(user1)));
      console.log("sessionafterlogin", req.session);
    }
  } catch (err) {
    console.log("sessionerr", err);
    next(err);
  }
});

router.post("/signup", async (req, res, next) => {
  try {
    console.log("db", db);
    console.log("db USERS", db.users);

    const newUser = await new user(req.body);
    // await db.users.insertOne(newUser);
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
  // console.log("logedin****", req.session.passport);
  // const user = req.session.passport;
  // res.json(user);
  //res.send(JSON.parse(req.user));
  //res.JSON.parse(req.user);
  res.send("helloworld");
});
