import appModulePath from 'app-module-path';
import http from 'http';
import express from 'express';
import cors from 'cors';

appModulePath.addPath(`${__dirname}`);

const Api = express();
const HTTP = http.Server(Api);

Api.use(cors());
Api.use(express.json())
Api.get('/test', (req, res) => res.status(200).send('success!'));
require("./routes/users.routes.js").default(Api);
require("./routes/student.routes.js").default(Api);
require("./routes/departement.routes.js").default(Api);
require("./routes/payment.routes.js").default(Api);
HTTP.listen(9001, () => {
    console.log('listening on *:9001');
});

