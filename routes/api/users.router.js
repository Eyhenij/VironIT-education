const express = require('express');
const {usersController} = require('../../controllers/UsersController.js');

const router = express.Router();

// get all users
router.get('/', (req, res) => {
    usersController.get(req, res);
});

// get one user by id
router.get('/:id', (req,res) => {
    usersController.getById(req, res);
});

// create new user
router.post('/', (req, res) => {
    usersController.add(req, res);
});

// update all users
router.put('/', (req, res) => {
    usersController.rewrite(req, res);
});

// update one user by id
router.put('/:id', (req,res) => {
    usersController.rewriteById(req, res);
});

// delete user by id
router.delete('/:id', (req,res) => {
    usersController.remove(req, res);
});

module.exports = router;