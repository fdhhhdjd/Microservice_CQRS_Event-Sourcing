const compression = require('compression');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const express = require('express');
const { default: helmet } = require('helmet');
const morgan = require('morgan');

const {
  errorHandleHelpers: { errorHandler, notFoundHandler },
  appHelpers: { getCorsOptions, getMorganFormat },
} = require('@/helpers');
const pathTraversalMiddleware = require('@/middlewares/pathTraversalMiddleware');
const loggerMiddleware = require('@/middlewares/loggerMiddleware');
const requestSizeLimiterMiddleware = require('@/middlewares/requestSizeLimiterMiddleware');

require('dotenv').config();
const app = express();

app.enable();
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);
app.use(cookieParser());
app.use(cors(getCorsOptions()));
app.use(requestSizeLimiterMiddleware);
app.use(pathTraversalMiddleware);
app.use(morgan(getMorganFormat()));
app.use(loggerMiddleware);

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
