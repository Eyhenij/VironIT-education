const fs = require('fs');
const URL = require('url');
const {users} = require('./Users.js');

const readFile = (pathToFile) => {
    return fs.readFileSync(pathToFile, 'utf-8');
};

exports.someFunc = (req) => {
    let urlData;
    switch (req.method) {
        case 'GET':
            return routing[req.url];
        case 'POST':
            urlData = URL.parse(req.url, true);
            const name = urlData.query.name;
            const age = Number(urlData.query.age);
            const id = users.getLength()+1;
            users.setNewUser(name, age, id);
            return `You just sent POST request with next parameters: name - ${name}, age - ${age}, id - ${id}`;
        case 'PUT':
            urlData = URL.parse(req.url, true);
            const newUsersArray = urlData.query.arr;
            users.putNewValueOfUsers(newUsersArray);
            return `You just sent PUT request with next parameter: new array - ${newUsersArray}`;
        case 'DELETE':
            return 'You just sent DELETE request';
        default:
            return 'The server does not handle this kind of requests';
    }
}

const routing = {
    '/': readFile('./pages/mainPage/mainPage.html'),
    '/style.css': readFile('./style.css'),
    '/mainPage.js': readFile('./pages/mainPage/mainPage.js'),
    '/users': users.getUsers(),
};

exports.types = {
        string: str => str,
        number: num => num.toString(),
        object: JSON.stringify,
        function: func => JSON.stringify(func()),
        undefined: () => 'Not found.',
};