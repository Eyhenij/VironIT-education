const express = require('express');
const path = require('path');

const port = 3000;
const hostname = 'localhost';
const app = express();

// body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/users', require('./routes/api/users.router')); //users API routes

app.listen(port, hostname, () => {
    console.log(`Server has been running at http://${hostname}:${port}`);
});
