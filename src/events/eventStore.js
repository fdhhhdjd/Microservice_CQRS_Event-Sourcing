const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const eventSchema = new mongoose.Schema({
  eventId: { type: String, required: true },
  aggregateId: { type: String, required: true },
  eventType: { type: String, required: true },
  eventData: { type: Object, required: true },
  timestamp: { type: Date, default: Date.now }
});

const Event = mongoose.model('Event', eventSchema);

const saveEvent = async (aggregateId, eventType, eventData) => {
  const event = new Event({
    eventId: uuidv4(),
    aggregateId,
    eventType,
    eventData
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
