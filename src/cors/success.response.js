const reasonPhrases = require('@/utils/reasonPhrases');
const statusCodes = require('@/utils/statusCodes');

class SuccessResponse {
  constructor({ message, statusCode = statusCodes.OK, reasonStatusCode = reasonPhrases.OK, metadata = {} }) {
    this.message = message || reasonStatusCode;
    this.status = statusCode;
    this.metadata = metadata;
  }

  send(res) {
    return res.status(this.status).json(this);
  }
}

// 2xx
class Ok extends SuccessResponse {
  constructor({
    option = {},
    message,
    statusCode = statusCodes.OK,
    reasonStatusCode = reasonPhrases.OK,
    metadata = {},
  }) {
    super({ message, statusCode, reasonStatusCode, metadata });
    this.option = option;
  }
}

class Created extends SuccessResponse {
  constructor({
    option = {},
    message,
    statusCode = statusCodes.CREATED,
    reasonStatusCode = reasonPhrases.CREATED,
    metadata = {},
  }) {
    super({ message, statusCode, reasonStatusCode, metadata });
    this.option = option;
  }
}

module.exports = { Ok, Created };
