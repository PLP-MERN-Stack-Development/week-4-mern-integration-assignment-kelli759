const Joi = require('joi');

exports.postSchema = Joi.object({
  title: Joi.string().min(3).required(),
  content: Joi.string().allow(''),
  category: Joi.string().hex().length(24).required()
});
