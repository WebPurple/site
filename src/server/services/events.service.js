const mongoose = require('mongoose');
const eventSchema = require('./../schemas/event.schema');

const Event = mongoose.model('event', eventSchema);

function getEvents() {
    return Event.find()
        .sort('-date')
        .populate('talks.speaker')
        .lean()
        .exec();
}

function addEvent(event) {
    return new Event(event).save()
        .then(addedEvent => Event.populate(addedEvent, 'talks.speaker'));
}

module.exports = {
    getEvents,
    addEvent,
};
