const Joi = require('joi');

const newUsersArraySchema = Joi.object({
    arr: Joi.string().required()
});

module.exports = newUsersArraySchema;