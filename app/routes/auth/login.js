const router = require("express").Router();

const User = require("../../models/User");
const valid = require("../../middleware/valid");
const validateLogin = require("../../validation/login");

// @route /api/auth/login
router.post("/", valid(validateLogin), async (req, res) => {
  // check if email exists
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).send("invalid email or password.");
  }
  // check if password is correct
  const valid = await user.compare(req.body.password);
  if (!valid) {
    return res.status(400).send("invalid email or password.");
  }
  // generate jwt token
  const token = user.generateAuthToken();
  // store token in a browser cookie
  // in production, Add cookie security options
  // for more info check www.npmjs.com/package/cookie#options-1
  res.cookie("token", token, { httpOnly: true });
  res.status(200).send({
    message: "successfully signed in.",
    token,
  });
});

module.exports = router;
