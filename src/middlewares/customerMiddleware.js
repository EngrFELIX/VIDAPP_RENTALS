const Joi = require("joi");

const validateCustomer = (param) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    phone: Joi.string().required(),
  });
  return schema.validate(param);
};

module.exports = validateCustomer;