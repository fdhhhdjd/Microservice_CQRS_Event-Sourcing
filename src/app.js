const compression = require('compression');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const express = require('express');
const { default: helmet } = require('helmet');
const morgan = require('morgan');

const { getCorsOptions, getMorganFormat } = require('@/helpers/appHelpers');
const { notFoundHandler, errorHandler } = require('@/helpers/errorHandle');
const pathTraversalMiddleware = require('@/middlewares/pathTraversalMiddleware');

const app = express();
require('dotenv').config();
app.enable();
app.use(morgan(getMorganFormat()));
app.use(cors(getCorsOptions()));
app.use(helmet());
app.use(pathTraversalMiddleware);
app.use(express.json());
app.use(compression());
app.use(cookieParser());
app.use(
  express.urlencoded({
    extended: true,
  }),
);

//* GLOBAL
require('@/globals/globals');

//* GROUP VERSION ROUTES
const apiRouter = express.Router();
const v1Router = require('@/app/v1/routes');

apiRouter.use('/v1', v1Router);

app.use('/api', apiRouter);

//* ERRORS
// Handle 404 - Not Found
app.use(notFoundHandler);

// Handle 5xx errors
app.use(errorHandler);

module.exports = app;
