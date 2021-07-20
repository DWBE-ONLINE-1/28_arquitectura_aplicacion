
require("dotenv").config();

const express = require('express');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT;

const env = require('./server/config/env');
const apiRouter = require('./routes/api');

app.use(morgan('combined'));

// < 4.16  body-parser => bodyParser.json()
app.use(express.json());

//http://localhost:4000/v1
app.use("/v1", apiRouter);

app.listen(PORT, () => {
    console.info(`Express listening on port ${PORT}`);
});