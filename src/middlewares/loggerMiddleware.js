const { v4: uuid } = require('uuid');

const MyLogger = require('@/loggers/logger');

const loggerMiddleware = (req, __, next) => {
  req.requestStartTime = Date.now();

  const requestId = req.headers['x-request-id'];
  req.requestId = requestId ? requestId : uuid();

  const logMessage = `input params::${req.method} - IP: ${req.ip}`;
  MyLogger.log(logMessage, [
    req.path,
    { requestId: req.requestId, ip: req.ip },
    req.method === 'POST' ? req.body : req.query,
  ]);

  next();
};

module.exports = loggerMiddleware;
