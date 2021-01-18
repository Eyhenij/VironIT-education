const {UsersService} = require('../services/UsersService.js');

class UsersController{
    service = new UsersService();

    get(req, res) {
        res
            .status(200)
            .json(this.service.getUsers());
    };

    getById(req, res) {
        this.service.getUsers().map(elem => elem.id).includes(Number(req.params.id))
            ? res
                .status(200)
                .json(this.service.getUsers().filter(elem => elem.id === Number(req.params.id)))
            : res
                .status(400)
                .json({ message: 'There is no the id which you are requiring' });
    };

    add(req, res) {
        const name = req.body.name;
        const email = req.body.email;
        const id = this.service.getLength() + 1;
        if(name && email) {
            this.service.setNewUser(name, email, id);
            res
                .status(201)
                .json({ message: `You just set new User ${id}: name - ${name}, email - ${email}.` });
        } else {
            res
                .status(400)
                .json({ message: 'Please, write name and email of new user and repeat request' })
        }
    };

    rewrite(req, res) {
        if (req.body.arr) {
            const newArray = req.body.arr;
            this.service.putNewValueOfUsers(newArray);
            res
                .status(201)
                .json({ message: `You just put new array of users: ${this.service.getUsers()}` });
        } else {
            res
                .status(400)
                .json({ message: `You have to write \"arr\"-field with value of new-users-array` });
        }
    };

    rewriteById(req, res) {
        const name = req.body.name;
        const email = req.body.email;
        const id = Number(req.params.id);
        if (name && email && this.service.getUsers().map(elem => elem.id).includes(id)) {
            const user = this.service.getUsers().filter(elem => elem.id === id);
            user[0].name = name;
            user[0].email = email;
            res
                .status(201)
                .json({ updatedUser: user });
        } else {
            res
                .status(400)
                .json({ message: 'There is no the id which you are requiring' });
        }
    };

    remove(req, res) {
        if (this.service.getUsers().map(elem => elem.id).includes(Number(req.params.id))) {
            this.service.deleteUser(Number(req.params.id));
            res
                .status(200)
                .json({ message: `User ${Number(req.params.id)} has been deleted` });
        } else {
            res
                .status(400)
                .json({ message: 'There is no the id which you are requiring' });
        }
    };

}

const usersController = new UsersController();


usersController.service.setNewUser('John', 'john@gmail.com', usersController.service.getLength()+1);
usersController.service.setNewUser('Mary', 'mary@gmail.com', usersController.service.getLength()+1);
usersController.service.setNewUser('Alex', 'alex@gmail.com', usersController.service.getLength()+1);
usersController.service.setNewUser('Vladimir', 'vladimir@gmail.com', usersController.service.getLength()+1);

exports.usersController = usersController;