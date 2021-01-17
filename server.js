const express = require('express');
const path = require('path');

const port = 3000;
const hostname = 'localhost';
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/users', require('./routes/api/users')); //users API routes

app.listen(port, hostname, () => {
    console.log(`Server has been running at http://${hostname}:${port}`);
});
