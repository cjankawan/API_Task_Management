const Joi = require('joi');

const taskSchema = Joi.object({
  title: Joi.string().trim().required(),
  description: Joi.string().trim().required(),
  status: Joi.string().valid('pending', 'in-progress', 'completed').optional()
});

module.exports = { taskSchema };
