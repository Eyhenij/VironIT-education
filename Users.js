class Users {

    _state = [];

    setNewUser(name, email, id) {
        this._state.push({
            name: name,
            email: email,
            id: id
        });
    };

    getUsers() {
        return this._state;
    };

    putNewValueOfUsers(newArray) {
        this._state = newArray;
    };

    deleteUser(userId) {
        if(this.getLength() > 0) {
            const allIds = this.getUsers().map(elem => elem.id)
            if(allIds.includes(userId)) {
                const index = allIds.indexOf(userId);
                this.getUsers().splice(index, 1);
                return index;
            } else {
                return 'This id does not exist'
            }
        } else {
            return 'There is nothing in Users';
        }
    };

    getLength() {
        return this._state.length;
    };

}

const users = new Users();

users.setNewUser('John', 'john@gmail.com', users.getLength()+1);
users.setNewUser('Mary', 'mary@gmail.com', users.getLength()+1);
users.setNewUser('Alex', 'alex@gmail.com', users.getLength()+1);
users.setNewUser('Vladimir', 'vladimir@gmail.com', users.getLength()+1);

exports.users = users;