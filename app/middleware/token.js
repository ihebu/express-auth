const jwt = require("jsonwebtoken");

// verify token through request header
const token = (parameter) => {
  return (req, res, next) => {
    // check if token exists
    const token = req.header(parameter);
    if (!token) {
      return res.status(401).send("access denied, no token provided.");
    }
    // check if token is valid
    try {
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
      // check if token if of correct type
      if (decoded.type != parameter) {
        return res.status(400).send("invalid token.");
      }
      req.decoded = decoded;
    } catch (err) {
      return res.status(400).send("invalid token.");
    }
    next();
  };
};

module.exports = token;
