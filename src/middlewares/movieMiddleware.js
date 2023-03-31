const Joi = require("joi");

const validateMovie = (param) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    numberInStock: Joi.number().required(),
    genre: Joi.required(),
  });
  return schema.validate(param);
};

module.exports = validateMovie;