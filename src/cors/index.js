//* Success
const Ok = require('./success.response').Ok;
const Created = require('./success.response').Created;

//* Error
const BadRequestRequestError = require('./error.response')
  .BadRequestRequestError;
const NotFoundError = require('./error.response').NotFoundError;
const ForbiddenError = require('./error.response').ForbiddenError;
const InternalServerError = require('./error.response').InternalServerError;
const TooManyRequestError = require('./error.response').TooManyRequestError;

module.exports = {
  // Success
  Ok,
  Created,
  // Error
  BadRequestRequestError,
  NotFoundError,
  ForbiddenError,
  InternalServerError,
  TooManyRequestError,
};
