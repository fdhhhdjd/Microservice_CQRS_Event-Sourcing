'use strict';

const path = require('path');
const { v4: uuid } = require('uuid');
const { format, createLogger, transports } = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');

const logsDirectory = path.join(__dirname, '../logs');

const logFormat = format.printf(
  ({ level, message, context, requestId, timestamp, metadata }) => {
    return `${timestamp} - ${level.toUpperCase()} - ${context} - ${requestId} - ${message} - ${JSON.stringify(
      metadata,
    )}`;
  },
);

const createTransport = level => {
  return new DailyRotateFile({
    dirname: logsDirectory,
    filename: `app-%DATE%.${level}.log`,
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
    level,
  });
};

class MyLogger {
  constructor() {
    this.logger = createLogger({
      format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        logFormat,
      ),
      transports: [
        new transports.Console(),
        createTransport('info'),
        createTransport('error'),
        createTransport('warn'),
      ],
    });
  }

  commonParams(params) {
    const [context = '', req = {}, metadata = {}] = Array.isArray(params)
      ? params
      : [params];
    const requestId = req.requestId || uuid();
    return { requestId, context, metadata };
  }

  log(message, params) {
    this.logger.info({ message, ...this.commonParams(params) });
  }

  error(message, params) {
    this.logger.error({ message, ...this.commonParams(params) });
  }

  warn(message, params) {
    // Added method for warning logs
    this.logger.warn({ message, ...this.commonParams(params) });
  }
}

module.exports = new MyLogger();
