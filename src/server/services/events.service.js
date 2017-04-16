const mongoose = require('mongoose');
const eventSchema = require('./../schemas/event.schema');

const Event = mongoose.model('event', eventSchema);

function getEvents() {
    return Event.find()
        .populate('talks.speaker')
        .exec();
}

function addEvent(event) {
    return new Event(event).save();
}

module.exports = {
    getEvents,
    addEvent,
};
