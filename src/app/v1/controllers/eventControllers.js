'use strict';

const { Ok } = require('@/cors');
const EventService = require('../services/eventService');

class EventControllers {
  async getHistoryEventService(req, res, __) {
    new Ok({
      metadata: await EventService.getHistoryEventService(req.query.aggregateId),
    }).send(res);
  }
}

module.exports = new EventControllers();
