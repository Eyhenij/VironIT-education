const validationSchema = require('../validation-schemes/schema.js');

const validation = async (req, res, next) => {
    try {
        await validationSchema.validateAsync(req.body);
        next();
    } catch (e) {
        res.status(400).json(e.message);
    }
};

module.exports = validation;