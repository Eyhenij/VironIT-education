const Joi = require("joi");
const validationSchema = require('../validation-schemes/schema.js');
const usersService = require('../services/UsersService.js');


const validation = (req, res, next) => {
    // Joi.validate(req.body, validationSchema);
    console.log(req.body);
    validationSchema.validate(req.body);
};

module.exports = validation;