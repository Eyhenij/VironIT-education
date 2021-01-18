const express = require('express');
const path = require('path');
const usersRouter = require('./routes/api/usersRouter.js');

const port = 3000;
const hostname = 'localhost';
const app = express();

// body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/users', usersRouter);

app.listen(port, hostname, () => {
    console.log(`Server has been running at http://${hostname}:${port}`);
});
