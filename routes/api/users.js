const express = require('express');
const {users} = require('../../Users.js');

const router = express.Router();

// get all users
router.get('/', (req, res) => {
    res.json(users.getUsers());
});

// get one user by id
router.get('/:id', (req,res) => {
    users.getUsers().map(elem => elem.id).includes(Number(req.params.id))
        ? res.json(users.getUsers().filter(elem => elem.id === Number(req.params.id)))
        : res.status(400).json({ message: 'There is no the id which you are requiring' });
});

// create new user
router.post('/', (req, res) => {
    const name = req.body.name;
    const age = Number(req.body.age);
    const id = users.getLength() + 1;
    if(name && age) {
        users.setNewUser(name, age, id);
        res.json({ message: `You just set new User ${id}: name - ${name}, age - ${age}.` });
    } else {
        res.status(400).json({ message: 'Please, write name and age of new user and repeat request' })
    }
});

// update all users
router.put('/', (req, res) => {
    if (req.body.arr) {
        const newArray = req.body.arr;
        users.putNewValueOfUsers(newArray);
        res.json({ message: `You just put new array of users: ${users.getUsers()}` });
    } else {
        res.json({ message: `You have to write \"arr\"-field with value of new-users-array` });
    }

});

// update one user by id
router.put('/:id', (req,res) => {
    const name = req.body.name;
    const age = Number(req.body.age);
    const id = Number(req.params.id);
    if (name && age && users.getUsers().map(elem => elem.id).includes(id)) {
        const user = users.getUsers().filter(elem => elem.id === id);
        user[0].name = name;
        user[0].age = age;
        res.json({ message: 'user updated', user });
    } else {
        res.status(400).json({ message: 'There is no the id which you are requiring' });
    }
});

// delete user
router.delete('/:id', (req,res) => {
    if (users.getUsers().map(elem => elem.id).includes(Number(req.params.id))) {
        users.deleteUser(Number(req.params.id));
        res.json({ message: `User ${Number(req.params.id)} has been deleted` });
    } else {
        res.status(400).json({ message: 'There is no the id which you are requiring' });
    }
});

module.exports = router;