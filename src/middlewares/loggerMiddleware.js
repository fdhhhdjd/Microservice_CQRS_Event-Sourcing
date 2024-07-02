const { v4: uuid } = require('uuid');

const MyLogger = require('@/loggers/logger');

const loggerMiddleware = (req, __, next) => {
  req.requestStartTime = Date.now();

  const requestId = req.headers['x-request-id'];
  req.requestId = requestId ? requestId : uuid();

  MyLogger.log(`input params::${req.method}`, [
    req.path,
    { requestId: req.requestId },
    req.method === 'POST' ? req.body : req.query,
  ]);

  next();
};

module.exports = loggerMiddleware;
