const express = require('express');
const logRouter = require('./routes/log');
const bodyParser = require('body-parser');

require('./dbs/db');
const readWorker = require('./services/readWorker');


var app = express();

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/log-ingestor',logRouter);
const port = 3000;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

