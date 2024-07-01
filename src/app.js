const compression = require('compression');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const express = require('express');
const { default: helmet } = require('helmet');
const morgan = require('morgan');

const app = express();
require('dotenv').config();
app.use(morgan('dev'));
app.enable();
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(compression());
app.use(cookieParser());
app.use(
  express.urlencoded({
    extended: true,
  }),
);

const { notFoundHandler, errorHandler } = require('./helpers/errorHandle');

//* GLOBAL
require('@/globals/globals');

//* GROUP VERSION ROUTES
const apiRouter = express.Router();
const v1Router = require('./app/v1/routes');

apiRouter.use('/v1', v1Router);

app.use('/api', apiRouter);

//* ERRORS
// Handle 404 - Not Found
app.use(notFoundHandler);

// Handle 5xx errors
app.use(errorHandler);

module.exports = app;
