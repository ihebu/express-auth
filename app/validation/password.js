const Joi = require("@hapi/joi");

validatePassword = (data) => {
  const schema = Joi.object({
    password: Joi.string().min(6).max(256).required(),
    confirmPassword: Joi.ref("password"),
  }).with("password", "confirmPassword");

  return schema.validate(data);
};

module.exports = validatePassword;
