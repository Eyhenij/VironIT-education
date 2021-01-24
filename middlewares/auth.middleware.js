const jwt = require('jsonwebtoken');
const usersService = require('../services/DBusersService.js');

const auth = async (req, res, next) => {
    try {
        const [strategy, token] = req.headers['authorization'].split(' ');
        const result = jwt.verify(token, usersService.jwtSecretPhrase);
        const userData = await usersService.getUserById(result.id);
        if(!userData) {
            res.status(401).send('User not found');
        } else if(userData.role !== result.role) {
            res.status(401).send('Invalid user data');
        }
    } catch (e) {
        res.status(401).send(e.message);
    }
    next();
};

module.exports = auth;