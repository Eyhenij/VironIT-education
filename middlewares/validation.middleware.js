const validation = (schema) => async (req, res, next) => {
    try {
        await schema.validateAsync(req.body);
        next();
    } catch (e) {
        res.status(400).json(e.message);
    }
};

module.exports = validation;