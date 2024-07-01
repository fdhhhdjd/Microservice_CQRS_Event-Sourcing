'use strict';

const { NotFoundError } = require('@/cors/error.response');
const { StatusCodes, ErrorCodes, ReasonPhrases } = require('@/utils');

// Handle 404 - Not Found
const notFoundHandler = (_, __, next) => {
  const error = new NotFoundError();
  next(error);
};

// Handle 5xx errors
const errorHandler = (error, __, res, ____) => {
  const statusCode = error.status || StatusCodes.INTERNAL_SERVER_ERROR;
  const errorCode = error.code || ErrorCodes.INTERNAL_SERVER_ERROR.code;
  const errorMessage = error.message || ReasonPhrases.INTERNAL_SERVER_ERROR;
  const errorDetails = error.details || [];
  const errorTime = error.timestamp || new Date().getTime();

  res.status(statusCode).json({
    code: errorCode,
    status: statusCode,
    message: errorMessage,
    timestamp: errorTime,
    details: errorDetails,
  });
};

module.exports = {
  notFoundHandler,
  errorHandler,
};
