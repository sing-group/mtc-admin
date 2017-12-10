'use strict';

const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();

// Setup logger
app.use(
    morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms')
);

app.use('/application', express.static(path.resolve(__dirname, './build')));
app.get('/', (req, res) => res.redirect('/application'));

app.use('/static', express.static(path.resolve(__dirname, './build/static')));

const PORT = 4000;

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);

});
