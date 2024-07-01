const BadRequestRequestError = require('./error.response')
  .BadRequestRequestError;
const NotFoundError = require('./error.response').NotFoundError;
const ForbiddenError = require('./error.response').ForbiddenError;
const InternalServerError = require('./error.response').InternalServerError;

module.exports = {
  BadRequestRequestError,
  NotFoundError,
  ForbiddenError,
  InternalServerError,
};