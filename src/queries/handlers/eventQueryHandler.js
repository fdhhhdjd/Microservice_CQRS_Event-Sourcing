'use strict';

const { EventHandler } = require('@/events/handlers');

class EventQueryHandler {
  static async getHistoryEventService(aggregateId) {
    try {
      const events = await EventHandler.getEvents(aggregateId);
      return events;
    } catch (error) {
      console.error('Failed to get events', error);
      throw error;
    }
  }
}

module.exports = EventQueryHandler;
