const { v4: uuidv4 } = require('uuid');

const { Event } = require('../models');

class EventHandler {
  static async saveEvent(aggregateId, eventType, eventData) {
    const event = new Event({
      eventId: uuidv4(),
      aggregateId,
      eventType,
      eventData,
    });
    await event.save();
    return event;
  }

  static async getEvents(aggregateId) {
    return await Event.find({ aggregateId })
      .lean()
      .sort({ timestamp: 1 })
      .exec();
  }
}

module.exports = EventHandler;
