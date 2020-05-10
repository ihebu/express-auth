const router = require("express").Router();
const User = require("../../models/User");
const auth = require("../../middleware/auth");

// @router /api/user
router.use("/verify", require("./verify"));
router.use("/reset", require("./reset"));

// get the current user
router.get("/", auth, async (req, res) => {
  const { _id } = req.decoded;
  const user = await User.findOne({ _id });
  const data = {
    _id,
    "first name": user.first,
    "last name": user.last,
    verified: user.verified,
    date: user.date,
  };
  res.status(200).send(data);
});

module.exports = router;
