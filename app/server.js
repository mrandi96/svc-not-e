/* eslint-disable no-console */
const express = require('express');
const enrouten = require('express-enrouten');
const cors = require('cors');
const sequelize = require('./database/sequelize');
const config = require('../config');
const { NOT_IMPLEMENTED } = require('./libs/constants/httpStatus');
const responseBuilder = require('./helpers/responseBuilder');
const debug = require('./libs/debug');

const PORT = process.env.PORT || config.PORT;
const isProduction = process.env.PRODUCTION || config.PRODUCTION || false;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use('/', enrouten({ directory: 'routes' }));
app.use('*', (_, res) => {
  const e = new Error('Path not implemented');
  e.status = NOT_IMPLEMENTED;
  responseBuilder(res, e);
});

sequelize.authenticate()
  .then(() => {
    app.listen(PORT, console.log(`Listening on port ${PORT}`));
    console.log('Connected to not-e');
    if (!isProduction) {
      sequelize.sync()
        .then(() => debug('Syncing database success'))
        .catch((e) => debug(e));
    }
  })
  .catch((e) => debug(e));
