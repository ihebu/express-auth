require("express-async-errors");
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");
const compression = require("compression");

const app = express();
const port = process.env.PORT || 5000;
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

// routes and middleware
app.use(express.json({ limit: "10kb" }));
app.use(limiter);
app.use(helmet());
app.use(cookieParser());
app.use(compression());
app.use("/api/user", require("./routes/user/index"));
app.use("/api/auth", require("./routes/auth/index"));
app.use(require("./middleware/error"));

// connect to DB
mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to mongodb database");
  })
  .catch((err) => {
    console.log(err);
  });

// start server
app.listen(port, () => {
  console.log(`server is now listening on port ${port}...`);
});
