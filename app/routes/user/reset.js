const router = require("express").Router();

const User = require("../../models/User");
const valid = require("../../middleware/valid");
const token = require("../../middleware/token");
const validateEmail = require("../../validation/email");
const validatePassword = require("../../validation/password");
const sendMail = require("../../helpers/email");

// send password reset email
// @route /api/user/reset/send
router.post("/send", valid(validateEmail), async (req, res) => {
  // check if email exists
  const user = await User.findOne({ email: req.body.email });
  // for security reasons
  // don't inform the client that the email does / does not exist in database
  if (!user) {
    return res.status(204).send();
  }
  // generate password reset token
  const token = user.generateResetToken();
  // send email
  await sendMail({
    receiver: user.email,
    subject: "Reset your password",
    data: { token },
    template: "forgot.hbs",
  });
  res.status(204).send();
});

// reset password
// @route /api/user/reset
router.patch(
  "/",
  token("x-reset-token"),
  valid(validatePassword),
  async (req, res) => {
    const { _id, hash, expires } = req.decoded;
    // check if token is expired
    if (Date.now() > expires) {
      return res.status(400).send("token expired.");
    }
    // check if token is already used
    const user = await User.findOne({ _id });
    const match = user.password === hash;
    if (!match) {
      return res.status(400).send("token expired.");
    }
    // check if the password is the same as the old one
    const same = await user.compare(req.body.password);
    if (same) {
      return res.status(400).send("must provide a different password.");
    }
    // hash the password
    const password = await user.hash(req.body.password);
    await user.updateOne({
      $set: {
        password: password,
      },
    });
    // send password reset confirmation email
    result = await sendMail({
      receiver: user.email,
      subject: "Password changed",
      data: {},
      template: "reset.hbs",
    });
    res.status(200).send({
      message: "successfully updated password",
      user: {
        _id: user._id,
        "first name": user.first,
        "last name": user.last,
      },
    });
  }
);

module.exports = router;
