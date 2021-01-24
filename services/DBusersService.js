const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/usersdb.js');


class UsersService {

    jwtSecretPhrase = 'ahjhgfo-i92-307-wh2-232-ahweoi3';

    _generateToken(userData, type) {
        return jwt.sign({ ...userData, type: type }, this.jwtSecretPhrase);
    };

    setNewUser(userData) {
        User.create({ ...userData });
    };

    getUsers() {
        return User.findAll({raw: true});
    };

    getUserById(userId) {
        return User.findByPk(userId, {raw: true});
    };

    putNewValueOfUsers(newArray) {
        User.destroy({
            where: {},
            truncate:true
        })
        User.bulkCreate(JSON.parse(newArray));
    };

    putNewPropsOfUserById(newUserData, userId) {
        User.update({ ...newUserData }, {where: {id: userId}});
    };

    deleteUser(userId) {
        User.destroy({where: {id: userId}});
    };

    async checkPassword(loginData) {
        const user = await User.findOne({where: {login: loginData.login}});
        if(user) {
            if (bcrypt.compareSync(loginData.password, user.password)) {
                return this._generateToken(user, 'access');
            } else {
                throw new Error('You have entered incorrect password');
            }
        } else {
            throw new Error('user not found');
        }
    };

}

const usersService = new UsersService();
module.exports = usersService;