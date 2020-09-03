const Joi = require("@hapi/joi");

validateEmail = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).max(256).email(),
  });
  return schema.validate(data);
};

module.exports = validateEmail;
