const express = require('express');
const usersRouter = require('./routes/api/usersRouter.js');
const authRouter = require('./routes/api/authRouter.js');
require('dotenv').config();

const port = 3000;
const hostname = 'localhost';
const app = express();

// body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(`${__dirname}/public`));
app.use('/api/users', usersRouter);
app.use('/api/login', authRouter);

app.listen(port, hostname, () => {
    console.log(`Server has been running at http://${hostname}:${port}`);
});
