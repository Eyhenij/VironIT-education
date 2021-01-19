const express = require('express');
const usersController = require('../../controllers/UsersController.js');

const router = express.Router();

router.get('/', usersController.get)
    .get('/:id', usersController.getById)
    .post('/', usersController.add)
    .put('/', usersController.rewrite)
    .put('/:id', usersController.rewriteById)
    .delete('/:id', usersController.remove);

module.exports = router;


// get one user by id
// send id as parameter in url, like this: http://localhost:3000/api/users/4

// create new user
// send user-data as json-file in request body with next fields: "name" and "email"

// update all users
// send new array of users as json-file in request body
// with next field: "arr"

// update one user by id
// take id by parameter in request, like this: http://localhost:3000/api/users/4
// and send user-data as json-file in request body with next fields: "name" and "email"

// delete user by id
// send id as parameter in url, like this: http://localhost:3000/api/users/4