const http = require('http');
const {reqHandler} = require('./reqHandler.js');

const port = 3000;
const hostname = 'localhost';

const server = http.createServer(reqHandler);

server.listen(port, hostname, () => {
    console.log(`Server has been running at http://${hostname}:${port}`);
});
