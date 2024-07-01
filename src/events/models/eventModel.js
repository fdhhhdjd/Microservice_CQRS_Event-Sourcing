const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  eventId: { type: String, required: true },
  aggregateId: { type: String, required: true },
  eventType: { type: String, required: true },
  eventData: { type: Object, required: true },
  timestamp: { type: Date, default: Date.now },
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
