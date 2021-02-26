const Joi = require('joi');

const newUsersArraySchema = Joi.object().keys({
    arr:
        Joi.array().items(Joi.object({
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            login: Joi.string().required(),
            password: Joi.string().min(6).required(),
            salt: Joi.number(),
            role: Joi.string()
    }).required())
});

module.exports = newUsersArraySchema;