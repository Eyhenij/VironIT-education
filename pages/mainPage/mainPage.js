document.querySelector('#to_get_users').onclick = () => {
    return fetch('http://localhost:3000/users', {
        method: 'GET'
    })
        .then(response => response.json())
        .then(data => {
            document.querySelector('.users__wrapper').innerText = data.map(element => {
                return `\nUser${element.id}: ${element.name}, age: ${element.age}`
            });
        });
};

// document.querySelector('#to_post_users').onclick = () => {
//     return fetch('http://localhost:3000/users', {
//         method: 'POST'
//     })
//         .then(response => response.json())
//         .then(data => alert(data));
// }