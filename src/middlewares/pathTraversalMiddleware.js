const xss = require('xss');

const { BadRequestRequestError } = require('@/cors');
const { ErrorCodes } = require('@/utils');

const pathTraversalMiddleware = (req, __, next) => {
  try {
    // Sanitize URL
    const sanitizedUrl = xss(req.url);
    if (sanitizedUrl !== req.url) {
      throw new BadRequestRequestError({
        code: ErrorCodes.SANITIZE_PARAMS.code,
        message: 'Path traversal attempt detected in URL',
      });
    }
    req.url = sanitizedUrl;

    // Sanitize query params
    for (const key in req.query) {
      const sanitizedValue = xss(req.query[key]);
      if (sanitizedValue !== req.query[key]) {
        throw new BadRequestRequestError({
          code: ErrorCodes.SANITIZE_PARAMS.code,
          message: `Path traversal attempt detected in query parameter: ${key}`,
        });
      }
      req.query[key] = sanitizedValue;
    }

    // Sanitize headers
    for (const header in req.headers) {
      const sanitizedValue = xss(req.headers[header]);
      if (sanitizedValue !== req.headers[header]) {
        throw new BadRequestRequestError({
          code: ErrorCodes.SANITIZE_PARAMS.code,
          message: `Path traversal attempt detected in header: ${header}`,
        });
      }
      req.headers[header] = sanitizedValue;
    }

    // Sanitize body if present
    if (req.body) {
      for (const key in req.body) {
        const value = req.body[key];
        const sanitizedValue = typeof value === 'string' ? xss(value) : value;
        if (sanitizedValue !== value) {
          throw new BadRequestRequestError({
            code: ErrorCodes.SANITIZE_PARAMS.code,
            message: `Path traversal attempt detected in body parameter: ${key}`,
          });
        }
        req.body[key] = sanitizedValue;
      }
    }

    next();
  } catch (error) {
    next(
      new BadRequestRequestError({
        code: ErrorCodes.SANITIZE_PARAMS.code,
        message: error.message || 'Path traversal attempt detected',
      }),
    );
  }
};

module.exports = pathTraversalMiddleware;
