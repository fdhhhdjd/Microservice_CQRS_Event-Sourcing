module.exports = {
  // Informational 1xx
  CONTINUE: {
    code: 100001,
    message: 'Continue',
    description:
      'The server has received the request headers and the client should proceed to send the request body.',
  },
  SWITCHING_PROTOCOLS: {
    code: 101001,
    message: 'Switching Protocols',
    description: 'The requester has asked the server to switch protocols.',
  },
  PROCESSING: {
    code: 102001,
    message: 'Processing',
    description: 'The server is processing the request but requires more time.',
  },

  // Successful 2xx
  OK: {
    code: 200001,
    message: 'OK',
    description: 'The request has succeeded.',
  },
  CREATED: {
    code: 201001,
    message: 'Created',
    description:
      'The request has been fulfilled, resulting in the creation of a new resource.',
  },
  ACCEPTED: {
    code: 202001,
    message: 'Accepted',
    description:
      'The request has been accepted for processing, but the processing has not been completed.',
  },
  NO_CONTENT: {
    code: 204001,
    message: 'No Content',
    description:
      'The server successfully processed the request and is not returning any content.',
  },

  // Redirection 3xx
  MOVED_PERMANENTLY: {
    code: 301001,
    message: 'Moved Permanently',
    description:
      'The requested resource has been assigned a new permanent URI and any future references to this resource should use one of the returned URIs.',
  },
  FOUND: {
    code: 302001,
    message: 'Found',
    description:
      'The server is currently responding to the request with a page from a different location, but the requestor should continue to use the original location for future requests.',
  },
  NOT_MODIFIED: {
    code: 304001,
    message: 'Not Modified',
    description:
      'The resource has not been modified since the version specified by the request headers If-Modified-Since or If-None-Match.',
  },

  // Client Error 4xx
  BAD_REQUEST: {
    code: 400001,
    message: 'Bad Request',
    description:
      'The server cannot process the request due to client error (e.g., malformed request syntax, invalid request message framing, or deceptive request routing).',
  },
  PATH_TRAVERSAL: {
    code: 400002,
    message: 'Path Traversal',
    description:
      'The request contains input that may attempt to access files or directories that are outside of the intended directory.',
  },
  UNAUTHORIZED: {
    code: 401001,
    message: 'Unauthorized',
    description:
      'The request has not been applied because it lacks valid authentication credentials for the target resource.',
  },
  FORBIDDEN: {
    code: 403001,
    message: 'Forbidden',
    description:
      'The server understood the request but refuses to authorize it.',
  },
  NOT_FOUND: {
    code: 404001,
    message: 'Not Found',
    description: 'The server cannot find the requested resource.',
  },
  METHOD_NOT_ALLOWED: {
    code: 405001,
    message: 'Method Not Allowed',
    description:
      'The method received in the request-line is known by the origin server but not supported by the target resource.',
  },

  // Server Error 5xx
  INTERNAL_SERVER_ERROR: {
    code: 500001,
    message: 'Internal Server Error',
    description:
      'The server encountered an unexpected condition that prevented it from fulfilling the request.',
  },
  NOT_IMPLEMENTED: {
    code: 501001,
    message: 'Not Implemented',
    description:
      'The server does not support the functionality required to fulfill the request.',
  },
  SERVICE_UNAVAILABLE: {
    code: 503001,
    message: 'Service Unavailable',
    description:
      'The server is currently unable to handle the request due to a temporary overload or maintenance of the server.',
  },
};
