const { v4: uuidv4 } = require('uuid');

const { Event } = require('../models');

const saveEvent = async (aggregateId, eventType, eventData) => {
  const event = new Event({
    eventId: uuidv4(),
    aggregateId,
    eventType,
    eventData,
  });
  await event.save();
  return event;
};

const getEvents = async aggregateId => {
  return await Event.find({ aggregateId })
    .sort({ timestamp: 1 })
    .exec();
};

module.exports = { saveEvent, getEvents };
