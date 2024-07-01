const sanitizeFilename = require('sanitize-filename');

const { BadRequestRequestError, InternalServerError } = require('@/cors');
const { ErrorCodes } = require('@/utils');

const pathTraversalMiddleware = (req, __, next) => {
  try {
    // Sanitize URL
    const sanitizedUrl = sanitizeFilename(req.url);
    if (sanitizedUrl !== req.url) {
      throw new BadRequestRequestError({
        code: ErrorCodes.PATH_TRAVERSAL.code,
      });
    }
    req.url = sanitizedUrl;

    // Sanitize query params
    for (const key in req.query) {
      const sanitizedValue = sanitizeFilename(req.query[key]);
      if (sanitizedValue !== req.query[key]) {
        throw new BadRequestRequestError({
          code: ErrorCodes.PATH_TRAVERSAL.code,
        });
      }
      req.query[key] = sanitizedValue;
    }

    // Sanitize headers
    for (const header in req.headers) {
      const sanitizedValue = sanitizeFilename(req.headers[header]);
      if (sanitizedValue !== req.headers[header]) {
        throw new BadRequestRequestError({
          code: ErrorCodes.PATH_TRAVERSAL.code,
        });
      }
      req.headers[header] = sanitizedValue;
    }

    if (req.body) {
      for (const key in req.body) {
        const sanitizedValue = sanitizeFilename(req.body[key]);
        if (sanitizedValue !== req.body[key]) {
          throw new BadRequestRequestError({
            code: ErrorCodes.PATH_TRAVERSAL.code,
          });
        }
        req.body[key] = sanitizedValue;
      }
    }

    next();
  } catch (_) {
    throw new BadRequestRequestError({
      code: ErrorCodes.PATH_TRAVERSAL.code,
    });
  }
};

module.exports = pathTraversalMiddleware;
