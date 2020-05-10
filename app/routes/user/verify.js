const router = require("express").Router();

const User = require("../../models/User");
const token = require("../../middleware/token");
const auth = require("../../middleware/auth");
const sendMail = require("../../helpers/email");

// resend verification email
// @route /api/user/verify/send
router.post("/send", auth, async (req, res) => {
  const _id = req.decoded._id;
  const user = await User.findOne({ _id: _id });
  // Check if user is already verified
  if (user.verified) {
    return res.status(400).send("user already verified.");
  }
  // Send verification email
  const token = user.generateVerificationToken();
  await sendMail({
    receiver: user.email,
    subject: "Verify your account",
    data: { token },
    template: "verify.hbs",
  });
  res.status(200).send();
});

// @route /api/user/verify
router.patch("/", token("x-verification-token"), async (req, res) => {
  const _id = req.decoded._id;
  const user = await User.findOne({ _id });
  // Check if user is already verified
  if (user.verified) {
    return res.status(400).send("token expired.");
  }
  await user.updateOne({
    $set: {
      verified: true,
    },
  });
  res.status(200).send({
    message: "successfully verified user.",
    user: {
      _id: user.id,
      verified: true,
    },
  });
});

module.exports = router;
