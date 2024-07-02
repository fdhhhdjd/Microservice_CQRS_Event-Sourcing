'use strict';

const { NotFoundError } = require('@/cors/error.response');
const { StatusCodes, ErrorCodes, ReasonPhrases } = require('@/utils');
const MyLogger = require('@/loggers/logger');
const { isNodeEnvMatch } = require('./appHelpers');
const { formatElapsedTime } = require('./formatElapsedTimeHelpers');

// Handle 404 - Not Found
const notFoundHandler = (_, __, next) => {
  const error = new NotFoundError();
  next(error);
};

// Handle 5xx errors
const errorHandler = (error, req, res, ____) => {
  const statusCode = error.status || StatusCodes.INTERNAL_SERVER_ERROR;
  const errorCode = error.code || ErrorCodes.INTERNAL_SERVER_ERROR.code;
  const errorMessage = error.message || ReasonPhrases.INTERNAL_SERVER_ERROR;
  const errorDetails = error.details || [];
  const errorTime = error.timestamp || new Date().getTime();

  // Calculate elapsed time correctly using req.requestStartTime
  const requestTime = req.requestStartTime || Date.now(); // Default to current time if not set
  const elapsedTime = Date.now() - requestTime;
  const elapsedTimeString = formatElapsedTime(elapsedTime);

  const reqMessage = `${statusCode} - ${elapsedTimeString} - Response: ${JSON.stringify(
    error,
  )}`;

  MyLogger.error(reqMessage, [
    req.path,
    { requestId: req.requestId },
    req.method === 'POST' ? req.body : req.query,
  ]);

  const response = {
    code: errorCode,
    status: statusCode,
    message: errorMessage,
    timestamp: errorTime,
    details: errorDetails,
  };

  if (isNodeEnvMatch()) {
    response.stack = error.stack;
  }

  return res.status(statusCode).json(response);
};

module.exports = {
  notFoundHandler,
  errorHandler,
};
