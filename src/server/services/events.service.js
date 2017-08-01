const mongoose = require('mongoose');
const eventSchema = require('./../schemas/event.schema');
const VkGroupId = require('./../conf/passport').strategies.vk.groupId;

const Event = mongoose.model('event', eventSchema);

function getEvents() {
    return Event.find()
        .sort('-date')
        .populate('talks.speaker')
        .select({ attendees: 0, vkId: 0 })
        .lean()
        .exec();
}

function addEvent(event) {
    return new Event(event).save()
        .then(addedEvent => Event.populate(addedEvent, 'talks.speaker'));
}

function deleteEvent(eventId) {
    return Event.findById(eventId)
        .remove()
        .exec();
}

function getEventWithAttendeesAndTalks(eventId) {
    return Event.findById(eventId)
        .select({ vkId: 0 })
        .populate('attendees', 'displayName vkPhotoUrl')
        .populate('talks.speaker', 'displayName vkPhotoUrl jobTitle')
        .exec();
}

function addAttendeeToEvent(eventId, attendeeId) {
    return Event.findByIdAndUpdate(
        eventId,
        { $push: { attendees: new mongoose.Types.ObjectId(attendeeId) } },
        { new: true, upsert: true }
    )
        .select({ attendees: 1 })
        .populate('attendees', 'displayName vkPhotoUrl')
        .exec();
}

function removeAttendeeFromEvent(eventId, attendeeId) {
    return Event.findByIdAndUpdate(
        eventId,
        { $pull: { attendees: new mongoose.Types.ObjectId(attendeeId) } },
        { new: true, upsert: true }
    )
        .select({ attendees: 1 })
        .populate('attendees', 'displayName vkPhotoUrl')
        .exec();
}

function getEventPhotos(eventId) {
    return Event.findById(eventId)
        .select({ vkId: 1 })
        .exec()
        .then(event => {
            if (!event.vkId) {
                return [];
            }
            return fetch(`https://api.vk.com/method/photos.get?owner_id=${VkGroupId}&album_id=${event.vkId}&v=5.63`)
                .then(response => response.status === 200 ? response.json() : Promise.reject(response.statusText))
                .then(data => data.response.items)
                .then(images => images.map(imageObject => imageObject.photo_604))
                .catch(() => []);
        })
        .catch(() => []);
}

module.exports = {
    getEvents,
    deleteEvent,
    addEvent,
    addAttendeeToEvent,
    removeAttendeeFromEvent,
    getEventWithAttendeesAndTalks,
    getEventPhotos,
};
