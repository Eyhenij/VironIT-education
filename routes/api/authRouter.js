const express = require('express');
const usersController = require('../../controllers/UsersController.js');

const router = express.Router();

router.post('/', usersController.login);

module.exports = router;


// send user-data as json-file in request body with next fields: "login" and "password"