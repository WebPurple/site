const express = require('express');

const eventsService = require('../services/events.service');

module.exports = () => {
    const router = express.Router(); // eslint-disable-line new-cap

    router.route('/events')
        // get all events
        .get((request, response) => eventsService.getEvents()
            .then(post => response.send(post))
            .catch(err => response.send(err)));

    return router;
};
