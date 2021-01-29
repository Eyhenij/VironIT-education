const validation = (schema) => async (req, res, next) => {
    try {
        await schema.validateAsync(req.body);
        console.log(req.body)
        next();
    } catch (e) {
        console.log(req.body)
        res.status(400).json(e.message);
    }
};

module.exports = validation;