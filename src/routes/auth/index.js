const router = require("express").Router();

// @route /api/auth
router.use("/signup", require("./signup"));
router.use("/login", require("./login"));
router.use("/signout", require("./signout"));

module.exports = router;
