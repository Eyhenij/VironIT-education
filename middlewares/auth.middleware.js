const jwt = require('jsonwebtoken');
const usersService = require('../services/UsersService.js');

const auth = (req, res, next) => {
    try {
        const [strategy, token] = req.headers['authorization'].split(' ');
        const result = jwt.verify(token, usersService.jwtSignature);
        const userData = usersService.getUsers().filter(elem => elem.login === result.payload.login);
        if(userData) {
        }else if(userData.role !== result.payload.role) {
            res.status(401).send('Invalid user data');
        } else {
            res.status(401).send('User not found');
        }
    } catch (e) {
        res.status(401).send(e.message);
    }
    next();
};



module.exports = auth;