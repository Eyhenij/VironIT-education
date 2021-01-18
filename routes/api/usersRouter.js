const express = require('express');
const {usersController} = require('../../controllers/UsersController.js');

const router = express.Router();

// get all users
router.get('/', (req,res) => {
    usersController.get(req, res);
});

// get one user by id
// send id as parameter in url, like this: http://localhost:3000/api/users/4
router.get('/:id', (req,res) => {
    usersController.getById(req, res);
});

// create new user
// send user-data as json-file in request body with next fields: "name" and "email"
router.post('/', (req, res) => {
    usersController.add(req, res);
});

// update all users
// send new array of users as json-file in request body
// with next field: "arr"
router.put('/', (req, res) => {
    usersController.rewrite(req, res);
});

// update one user by id
// take id by parameter in request, like this: http://localhost:3000/api/users/4
// and send user-data as json-file in request body with next fields: "name" and "email"
router.put('/:id', (req,res) => {
    usersController.rewriteById(req, res);
});

// delete user by id
// send id as parameter in url, like this: http://localhost:3000/api/users/4
router.delete('/:id', (req,res) => {
    usersController.remove(req, res);
});

module.exports = router;