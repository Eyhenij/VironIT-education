const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/usersdb.js');


class UsersService {

    _generateToken(userData, type) {
        return jwt.sign({ ...userData, type: type }, process.env.JWT_PHRASE);
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
        User.bulkCreate(newArray);
    };

    putNewPropsOfUserById(newUserData, userId) {
        User.update({ ...newUserData }, {where: {id: userId}});
    };

    deleteUser(userId) {
        User.destroy({where: {id: userId}});
    };

    _checkPassword(loginData, user) {
            if (bcrypt.compareSync(loginData.password, user.password)) {
                return this._generateToken(user, 'access');
            } else {
                throw new Error('You have entered incorrect password');
            }
    };

    async getAuthData(loginData) {
        const user = await User.findOne({where: {login: loginData.login}});
        if (!user) {
            throw new Error('user not found');
        }
        const token = await this._checkPassword(loginData, user);
        return {
            profile: user,
            token: `Bearer ${token}`
        };
    }

}

const usersService = new UsersService();
module.exports = usersService;
