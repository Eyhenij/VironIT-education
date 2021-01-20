const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

class UsersService {


    _fileName = path.join(__dirname, 'usersFile.json');
    jwtSignature = 'ahjhgfo-i92-307-wh2-232-ahweoi3';

    _generateId(count) {
        const sequence = 'abcdefghijklmnopqrstuvwxyz1234567890';
        let newId = '';
        for (let i=0; i<count; i++) {
            newId += sequence[Math.floor(Math.random() * sequence.length)];
        }
        return newId;
    };

    _validateId(userId) {
        if (this.getUsers().find(elem => elem.id === userId)) {
            const newId = this._generateId();
            this._validateId(newId);
        } else {
            return userId;
        }
    };

    _hashOfPassword(passwordFromUser, saltRounds) {
        return bcrypt.hashSync(passwordFromUser, saltRounds);
    };

    _generateToken(userData, type) {
        const payload = {
            login: userData.login,
            role: userData.role,
            type: type
        };

        return jwt.sign({payload}, this.jwtSignature);
    };

    setNewUser(name, email, login, password) {
        const uniqId = this._generateId(3);
        this._validateId(uniqId);

        const salt = Math.round(Math.random() * 10);

        const hashPassword = this._hashOfPassword(password, salt);

        const newUser = {
            name: name,
            login: login,
            email: email,
            password: hashPassword,
            salt: salt,
            id: uniqId,
            role: 'user'
        };

        const content = this.getUsers();
        content.push(newUser);
        this.putNewValueOfUsers(JSON.stringify(content));
    };

    getUsers() {
        return JSON.parse(fs.readFileSync(this._fileName, 'utf-8'));
    };

    getUserById(userId) {
        return this.getUsers().filter(elem => elem.id === userId);
    };

    putNewValueOfUsers(newArray) {
        fs.writeFileSync(this._fileName, newArray);
    };

    putNewPropsOfUserById(newName, newEmail, newLogin, newPassword, userId) {
        const content = this.getUsers();
        const user = content.find(elem => elem.id === userId);
        user.name = newName;
        user.email = newEmail;
        user.login = newLogin;
        user.password = newPassword;
        this.putNewValueOfUsers(JSON.stringify(content));
    };

    deleteUser(userId) {
        if(this.getLength() > 0) {
            const newArray = this.getUsers().filter(elem => elem.id !== userId);
                return this.putNewValueOfUsers(JSON.stringify(newArray));
        } else {
            throw new Error('There is nothing in Users');
        }
    };

    getLength() {
        return this.getUsers().length;
    };

    checkPassword(login, password) {
        const user = this.getUsers().filter(elem => elem.login === login)[0];
        if(user) {
            if (bcrypt.compareSync(password, user.password)) {
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

// usersService.setNewUser('John', 'john@gmail.com', '@john', 'djwAA2388irn1w312');
// usersService.setNewUser('Mary', 'mary@gmail.com', '@mary', 'xjiyg3498chmkoi8s');
// usersService.setNewUser('Vladimir', 'vladimir@gmail.com', '@vladimir', 'prtosdtk4389fdr65');

module.exports = usersService;