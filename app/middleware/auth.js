const jwt = require("jsonwebtoken");

// Middleware for authentication-protected routes
// Verify token from cookie
const auth = (req, res, next) => {
  // Check if token exists
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).send("access denied, no token provided.");
  }
  // Check if token is valid
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    req.decoded = decoded;
  } catch (err) {
    return res.status(400).send("invalid token.");
  }
  next();
};

module.exports = auth;
