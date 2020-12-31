/* eslint-disable no-console */
const express = require('express');
const enrouten = require('express-enrouten');
const sequelize = require('./database/sequelize');
const config = require('../config');
const httpStatus = require('./libs/constants/httpStatus');
const responseBuilder = require('./helpers/responseBuilder');

const PORT = process.env.PORT || config.PORT;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', enrouten({ directory: 'routes' }));
app.use('*', (req, res) => responseBuilder(res, 'path not implemented', httpStatus.NOT_IMPLEMENTED));

sequelize.authenticate()
  .then(() => {
    app.listen(PORT, console.log(`Listening on port ${PORT}`));
    console.log('Connected to not-e');
    sequelize.sync()
      .then(() => console.log('Syncing database success'))
      .catch((e) => console.error('Syncing error', e));
  })
  .catch((e) => console.error('Authenticate error', e));
