const Joi = require("@hapi/joi");

validateSignup = (data) => {
  const schema = Joi.object({
    first: Joi.string().min(2).max(50).required(),
    last: Joi.string().min(2).max(50).required(),
    email: Joi.string().email().min(6).max(256).required(),
    password: Joi.string().min(6).max(256).required(),
    confirmPassword: Joi.ref("password"),
  }).with("password", "confirmPassword");

  return schema.validate(data);
};

module.exports = validateSignup;
