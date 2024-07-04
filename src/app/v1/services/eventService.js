const { BadRequestRequestError } = require('@/cors');
const { EventHandler } = require('@/queries/handlers');

class EventService {
  static async getHistoryEventService(aggregateId) {
    if (!aggregateId) {
      throw new BadRequestRequestError();
    }
    return await EventHandler.getHistoryEventService(aggregateId);
  }
}

module.exports = EventService;
