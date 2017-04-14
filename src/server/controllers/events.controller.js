const express = require('express');

const eventsService = require('../services/events.service');

function isAuthenticated(request, response, next) {
    if (request.isAuthenticated()) {
        next();
    } else {
        response.status(401).send('Not authorized');
    }
}

module.exports = () => {
    const router = express.Router(); // eslint-disable-line new-cap

    router.route('/events')
        // get all events
        .get((request, response) => eventsService.getEvents()
            .then(post => response.send(post))
            .catch(err => response.send(err)));

    router.route('/event/:eventId')
        .get((request, response) => eventsService.getEventWithAttendeesAndTalks(request.params.eventId)
            .then(event => response.send(event))
            .catch(err => response.code(500).send(err)));

    router.route('/event/:eventId/attendees')
        // add curret user as attendee to event
        .put(isAuthenticated, (request, response) => eventsService.addAttendeeToEvent(request.params.eventId, request.user._id)
            .then((event) => response.send(event))
            .catch((error) => response.send(error)))
        // remove current user as attendee from event
        .delete(isAuthenticated, (request, response) => eventsService.removeAttendeeFromEvent(request.params.eventId, request.user._id)
            .then((event) => response.send(event))
            .catch((error) => response.send(error)));

    router.route('/event/:eventId/photos')
        .get((request, response) => eventsService.getEventPhotos(request.params.eventId)
            .then(photos => response.send(photos))
            .catch(() => response.send([])));

    return router;
};
