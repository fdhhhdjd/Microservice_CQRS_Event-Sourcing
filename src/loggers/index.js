'use strict';

const path = require('path');
const { v4: uuid } = require('uuid');
const { format, createLogger, transports } = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');

const logsDirectory = path.join(__dirname, '../logs');

const createFilter = level =>
  format(info => {
    return info.level === level ? info : false;
  })();

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
    format: format.combine(
      format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      logFormat,
      createFilter(level),
    ),
  });
};

class MyLogger {
  constructor() {
    this.logger = createLogger({
      transports: [
        new transports.Console({
          format: format.combine(
            format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            logFormat,
          ),
          level: 'info',
        }),
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
    this.logger.warn({ message, ...this.commonParams(params) });
  }
}

module.exports = new MyLogger();
