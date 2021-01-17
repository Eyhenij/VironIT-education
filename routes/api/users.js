const express = require('express');
const {users} = require('../../Users.js');

const router = express.Router();

router.get('/', (req, res) => {
    res.json(users.getUsers());
});

router.get('/:id', (req,res) => {
    !users.getUsers().map(elem => elem.id).includes(Number(req.params.id))
        ? res.status(400).json({message: 'There is no the id which you are requiring'})
        : res.json(users.getUsers().filter(elem => elem.id === Number(req.params.id)));
});

module.exports = router;