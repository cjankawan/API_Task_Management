const Joi = require("joi");

const taskSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  status: Joi.string().valid("pending", "in-progress", "completed"),
});

const updateStatusSchema = Joi.object({
  status: Joi.string().valid("pending", "in-progress", "completed").required(),
});

module.exports = { taskSchema, updateStatusSchema };
