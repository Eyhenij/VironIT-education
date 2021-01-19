const usersService = require('../services/UsersService.js');

class UsersController{
    service = usersService;

    get = (req, res) => {
        res
            .status(200)
            .json(this.service.getUsers());
    };

    getById = (req, res) => {
        res
            .status(200)
            .json(this.service.getUserById(req.params.id));
    };


    add = (req, res) => {
        this.service.setNewUser(req.body.name, req.body.email);
        res
            .status(201)
            .json({ message: `You just set new User: name - ${req.body.name}, email - ${req.body.email}.` });
    };

    rewrite = (req, res) => {
        this.service.putNewValueOfUsers(req.body.arr);
        res
            .status(201)
            .json({ message: `You just put new array of users: ${this.service.getUsers()}` });
    };

    rewriteById = (req, res) => {
        this.service.putNewPropsOfUserById(req.body.name, req.body.email, req.params.id);
        res
            .status(201)
            .json({ updatedUser: this.service.getUserById(req.params.id) });
    };

    remove = (req, res) => {
        this.service.deleteUser(req.params.id);
        res
            .status(200)
            .json({ message: `User ${req.params.id} has been deleted` });
    };

}

const usersController = new UsersController();
module.exports = usersController;