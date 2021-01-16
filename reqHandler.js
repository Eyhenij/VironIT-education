const {someFunc, types} = require('./router.js');

exports.reqHandler = (req, res) => {

            const data = someFunc(req);
            const type = typeof data;
            const serializer = types[type];
            const result = serializer(data);
            res.end(result);

};