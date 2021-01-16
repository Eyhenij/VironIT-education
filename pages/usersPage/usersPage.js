// const {users} = require('../../Users.js');

document.querySelector('#to_get_users').onclick = () => {

    return fetch('http://localhost:3000/users/GET', {
            method: 'GET'
        })
        .then(response => response.json())
        .then(data => {
                document.querySelector('.users__wrapper').innerText = data.map(element => {
                    return `\nUser${element.id}: ${element.name}, age: ${element.age}`
                });
        });
}