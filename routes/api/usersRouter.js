const express = require('express');
const usersController = require('../../controllers/UsersController.js');
const auth = require('../../middlewares/auth.middleware.js');
const validation = require('../../middlewares/validation.middleware.js');
const newUserSchema = require('../../validation-schemes/newUserSchema.js');
const newUsersArraySchema = require('../../validation-schemes/newUsersArraySchema.js');

const router = express.Router();

router
    .get('/', auth, usersController.get)
    .get('/:id', auth, usersController.getById)
    .post('/', validation(newUserSchema), usersController.add)
    .put('/', auth, validation(newUsersArraySchema), usersController.rewrite)
    .put('/:id', auth, usersController.rewriteById)
    .delete('/:id', auth, usersController.remove);

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
