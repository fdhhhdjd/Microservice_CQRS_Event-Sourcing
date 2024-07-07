'use strict';

const errorCodes = require('@/utils/errorCodes');
const reasonPhrases = require('@/utils/reasonPhrases');
const statusCodes = require('@/utils/statusCodes');

class ErrorResponse extends Error {
  constructor(message, status, code, details) {
    super(message);
    this.status = status;
    this.code = code;
    this.timestamp = new Date().getTime();
    this.details = details || [];
  }
}

//* 4xx
class BadRequestRequestError extends ErrorResponse {
  constructor({
    message = reasonPhrases.BAD_REQUEST,
    statusCode = statusCodes.BAD_REQUEST,
    code = errorCodes.BAD_REQUEST.code,
    details,
  } = {}) {
    super(message, statusCode, code, details);
  }
}

class TooManyRequestError extends ErrorResponse {
  constructor({
    message = reasonPhrases.TOO_MANY_REQUESTS,
    statusCode = statusCodes.TOO_MANY_REQUESTS,
    code = errorCodes.TOO_MANY_REQUESTS.code,
    details,
  } = {}) {
    super(message, statusCode, code, details);
  }
}

class NotFoundError extends ErrorResponse {
  constructor({
    message = reasonPhrases.NOT_FOUND,
    statusCode = statusCodes.NOT_FOUND,
    code = errorCodes.NOT_FOUND.code,
    details,
  } = {}) {
    super(message, statusCode, code, details);
  }
}

class ForbiddenError extends ErrorResponse {
  constructor({
    message = reasonPhrases.FORBIDDEN,
    statusCode = statusCodes.FORBIDDEN,
    code = errorCodes.FORBIDDEN.code,
    details,
  } = {}) {
    super(message, statusCode, code, details);
  }
}

//* 5xx
class InternalServerError extends ErrorResponse {
  constructor({
    message = reasonPhrases.INTERNAL_SERVER_ERROR,
    statusCode = statusCodes.INTERNAL_SERVER_ERROR,
    code = errorCodes.INTERNAL_SERVER_ERROR.code,
    details,
  } = {}) {
    super(message, statusCode, code, details);
  }
}

module.exports = {
  // 4xx
  BadRequestRequestError,
  NotFoundError,
  ForbiddenError,
  TooManyRequestError,

  // 5xx
  InternalServerError,
};
