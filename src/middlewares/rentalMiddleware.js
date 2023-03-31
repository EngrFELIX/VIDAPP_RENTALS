const Joi = require("joi");

const rentalValidate = (params) => {
  const schema = Joi.object({
    rentalFee: Joi.number().required(),
  });

  return schema.validate(params);
};

module.exports = rentalValidate;