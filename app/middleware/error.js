const error = (err, req, res, next) => {
  console.log(err);
  res.status(500).send("something went wrong.");
};

module.exports = error;
