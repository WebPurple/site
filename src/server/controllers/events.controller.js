const express = require('express');
const omit = require('ramda').omit;

const eventsService = require('../services/events.service');
const userService = require('../services/user.service');
const checkPermissions = require('./../utils/security-utils').checkPermissions;

module.exports = () => {
    const router = express.Router(); // eslint-disable-line new-cap

    router.route('/events')

        // get all events
        .get((request, response) => eventsService.getEvents()
            .then(events => response.json(events))
            .catch(err => response.status(500).send(err)))

        // add new event
        .post((request, response) => {

            const event = request.body;

            Promise.all(
                // if speaker is known user
                event.talks.map(talk => talk.speaker._id !== -1
                    // just return talk as it is
                    ? Promise.resolve(talk)
                    // otherwise create new user
                    : userService.createUser(omit(['_id'], talk.speaker))
                        // and fulfill talk with created user
                        .then(speaker => Object.assign(talk, { speaker })))
                )
                // when we ensured that all talks have speakers - update event object
                .then(talks => Object.assign(event, { talks }))
                // and finally put it to db
                .then(fulfilledEvent => eventsService.addEvent(fulfilledEvent)
                    .then(addedEvent => response.json(addedEvent))
                    .catch(err => response.status(500).send(err)));
        });

    router.route('/event/:eventId')
        .get((request, response) => eventsService.getEventWithAttendeesAndTalks(request.params.eventId)
            .then(event => response.send(event))
            .catch(err => response.code(500).send(err)))

        .delete(({ params: { eventId } }, response) => eventsService.deleteEvent(eventId)
            .then(event => response.send(event))
            .catch(err => response.code(500).send(err)));

    router.route('/event/:eventId/attendees')
        // add curret user as attendee to event
        .post(checkPermissions(), (request, response) => eventsService.addAttendeeToEvent(request.params.eventId, request.user._id)
            .then(event => response.send(event))
            .catch(error => response.send(error)))
        // remove current user as attendee from event
        .delete(checkPermissions(), (request, response) => eventsService.removeAttendeeFromEvent(request.params.eventId, request.user._id)
            .then(event => response.send(event))
            .catch(error => response.send(error)));

    router.route('/event/:eventId/photos')
        .get((request, response) => eventsService.getEventPhotos(request.params.eventId)
            .then(photos => response.send(photos))
            .catch(() => response.send([])));

    return router;
};
