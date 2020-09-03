const router = require("express").Router();

// @route /api/auth/signout
router.delete("/", (req, res) => {
  // remove the jwt token from the user browser cookie
  res.clearCookie("token");
  res.status(200).send({ message: "successfully signed out." });
});

module.exports = router;
