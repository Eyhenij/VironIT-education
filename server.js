const express = require('express');
const usersRouter = require('./routes/api/usersRouter.js');
const authRouter = require('./routes/api/authRouter.js');
const cors = require('cors');
require('dotenv').config();

const app = express();

// body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// cors allow middleware
app.use(cors());
app.options('*', cors());

app.use(express.static(`${__dirname}/public`));
app.use('/api/users', usersRouter);
app.use('/api/login', authRouter);

app.listen(process.env.PORT, process.env.HOST_NAME, () => {
    console.log(`Server has been running at http://${process.env.HOST_NAME}:${process.env.PORT}`);
});
