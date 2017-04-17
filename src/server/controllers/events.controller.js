const express = require('express');
const omit = require('lodash/omit');

const eventsService = require('../services/events.service');
const userService = require('../services/user.service');

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
                    : userService.createUser(omit(talk.speaker, '_id'))
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

    return router;
};
