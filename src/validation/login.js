const Joi = require("@hapi/joi");

validateLogin = (data) => {
  const schema = Joi.object({
    email: Joi.string().max(256).email(),
    password: Joi.string().max(256).required(),
  });
  return schema.validate(data);
};

module.exports = validateLogin;
