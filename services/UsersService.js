const fs = require('fs');
const path = require('path');

class UsersService {

    _fileName = path.join(__dirname, 'usersFile.json');

    _generateId() {
        const sequence = 'abcdefghijklmnopqrstuvwxyz1234567890';
        let newId = '';
        for (let i=0; i<3; i++) {
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

    setNewUser(name, email) {
        const uniqId = this._generateId();
        this._validateId(uniqId);

        const newUser = {
            name: name,
            email: email,
            id: uniqId
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

    putNewPropsOfUserById(newName, newEmail, userId) {
        const content = this.getUsers();
        const user = content.find(elem => elem.id === userId);
        user.name = newName;
        user.email = newEmail;
        this.putNewValueOfUsers(JSON.stringify(content));
    };

    deleteUser(userId) {
        if(this.getLength() > 0) {
            const newArray = this.getUsers().filter(elem => elem.id !== userId);
                return this.putNewValueOfUsers(JSON.stringify(newArray));
        } else {
            return 'There is nothing in Users';
        }
    };

    getLength() {
        return this.getUsers().length;
    };

}

const usersService = new UsersService();
module.exports = usersService;