const Joi = require("joi");

const validateGenre = (param) => {
  const schema = Joi.object({
    name: Joi.string().required(),
  });

  return schema.validate(param);
};

module.exports = validateGenre;