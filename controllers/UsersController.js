const usersService = require('../services/DBusersService.js');

class UsersController {
    service = usersService;

    get = async (req, res) => {
        res
            .status(200)
            .json(await this.service.getUsers());
    };

    getById = async (req, res) => {
        res
            .status(200)
            .json(await this.service.getUserById(req.params.id));
    };

    add = async (req, res) => {
        await this.service.setNewUser(req.body);
        res
            .status(201)
            .json({message: `You just create new User: login - ${req.body.login}, email - ${req.body.email}.`});
    };

    rewrite = async (req, res) => {
        await this.service.putNewValueOfUsers(req.body.arr);
        res
            .status(201)
            .json({message: 'You just put new array of users'});
    };

    rewriteById = async (req, res) => {
        await this.service.putNewPropsOfUserById(req.body, req.params.id);
        res
            .status(201)
            .json({message: `User ${req.params.id} has been updated`});
    };

    remove = async (req, res) => {
        await this.service.deleteUser(req.params.id);
        res
            .status(200)
            .json({message: `User ${req.params.id} has been deleted`});
    };

    login = async (req, res) => {
        const authResponse = await this.service.getAuthData(req.body);
        res
            .status(200)
            .json(authResponse);
    };

}

const usersController = new UsersController();
module.exports = usersController;
