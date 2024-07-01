const rateLimit = require('express-rate-limit');

const { TooManyRequestError } = require('@/cors');
const {
  timeConstants: { _1_MINUTE },
} = require('@/constants');

const MAX_REQUEST = 300;

const requestSizeLimiterMiddleware = rateLimit({
  windowMs: _1_MINUTE,
  max: MAX_REQUEST,
  handler: (_, __, next) => {
    const error = new TooManyRequestError();
    next(error);
  },
  standardHeaders: true,
});

module.exports = requestSizeLimiterMiddleware;
