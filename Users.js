class Users {

    _state = [];

    setNewUser(name, age, id) {
        this._state.push({
            name: name,
            age: age,
            id: id
        });
    };

    getUsers() {
        return this._state;
    };

    putNewValueOfUsers(newArray) {
        this._state = newArray;
    };

    deleteUser() {
        const length = this.getLength();
        // if(this._state.length > 0) {
        //     const elem = this._state.map(element => element.name);
        //     // const index = this._state.indexOf();
        //     // this._state.splice()
        //     return elem;
        // } else {
        //     return 'в users ничего нет';
        // }

    };

    getLength() {
        return this._state.length;
    };

}

const users = new Users();

users.setNewUser('John', 23, 1);
users.setNewUser('Mary', 21, 2);
users.setNewUser('Alex', 27, 3);
users.setNewUser('Vladimir', 25, 4);

exports.users = users;