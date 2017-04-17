const express = require('express');

const eventsService = require('../services/events.service');

module.exports = () => {
    const router = express.Router(); // eslint-disable-line new-cap

    router.route('/events')
        // get all events
        .get((request, response) => eventsService.getEvents()
            .then(events => response.json(events))
            .catch(err => response.status(500).send(err)))
        // add new event
        .post((request, response) => eventsService.addEvent(request.body)
            .then(event => response.json(event))
            .catch(err => response.status(500).send(err)));

    return router;
};
