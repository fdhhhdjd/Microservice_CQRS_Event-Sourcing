'use strict';

const { v4: uuid } = require('uuid');
const MyLogger = require('@/loggers/logger');
const {
  formatTimeHelpers: { formatElapsedTime },
} = require('@/helpers');
const { StatusCodes } = require('@/utils');

const monitoringMiddleware = (req, res, next) => {
  req.requestId = req.headers['x-request-id'] || uuid();

  const { method, originalUrl, ip, headers, requestStartTime } = req;

  res.on('finish', () => {
    const { statusCode } = res;
    const elapsedTime = Date.now() - requestStartTime;
    const elapsedTimeString = formatElapsedTime(elapsedTime);

    const logMessage = `${method} ${originalUrl} - ${statusCode} - ${ip} - ${elapsedTimeString}`;

    const caseSaveLog =
      (statusCode >= StatusCodes.BAD_REQUEST &&
        statusCode < StatusCodes.INTERNAL_SERVER_ERROR &&
        statusCode !== StatusCodes.NOT_FOUND) ||
      statusCode >= StatusCodes.INTERNAL_SERVER_ERROR;

    if (caseSaveLog) {
      MyLogger.warn(logMessage, [req.requestId, headers]);
    }

    delete req.requestStartTime;
  });

  next();
};

module.exports = monitoringMiddleware;
