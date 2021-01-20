const Joi = require('joi');

const validationSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    login: Joi.string().required(),
    password: Joi.string().min(6).required(),
});

module.exports = validationSchema;