const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  first: {
    type: String,
    min: 2,
    max: 50,
  },
  last: {
    type: String,
    min: 2,
    max: 50,
  },
  email: {
    type: String,
    min: 6,
    max: 256,
  },
  password: {
    type: String,
    min: 6,
    max: 256,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  verified: {
    type: Boolean,
    default: false,
  },
});

// hash the password before saving it to database
UserSchema.pre("save", async function () {
  this.password = await this.hash(this.password);
});

UserSchema.methods.hash = async function (password) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

UserSchema.methods.compare = async function (password) {
  const valid = await bcrypt.compare(password, this.password);
  return valid;
};

UserSchema.methods.generateAuthToken = function () {
  const obj = {
    _id: this._id,
    type: "x-auth-token",
  };
  const token = jwt.sign(obj, process.env.TOKEN_SECRET);
  return token;
};

UserSchema.methods.generateVerificationToken = function () {
  const obj = {
    _id: this._id,
    type: "x-verification-token",
  };
  const token = jwt.sign(obj, process.env.TOKEN_SECRET);
  return token;
};

UserSchema.methods.generateResetToken = function () {
  const obj = {
    _id: this._id,
    type: "x-reset-token",
    hash: this.password,
    expires: Date.now() + 30 * 60 * 1000, // token expires in 30 min
  };
  const token = jwt.sign(obj, process.env.TOKEN_SECRET);
  return token;
};

module.exports = mongoose.model("User", UserSchema);
