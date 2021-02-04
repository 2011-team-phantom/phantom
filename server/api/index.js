const router = require("express").Router();
const User = require("../db/models/users");

router.get("/", function (req, res, next) {
  console.log("connected");
});

router.post("/addbudget", async function (req, res, next) {
  try {
    const user = await User.updateOne(
      { _id: "601ad005dd55021bd4aab7e8" },
      { $set: { budget: req.body } }
    );
    console.log("budgetuser", user);
    res.send(user);
  } catch (error) {
    console.log("errorbudget", error);
  }
});

router.get("/budget", function (req, res, next) {});

router.use(function (req, res, next) {
  const err = new Error("Not found.");
  err.status = 404;
  next(err);
});

module.exports = router;
