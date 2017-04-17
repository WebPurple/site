const express = require('express');

const eventsService = require('../services/events.service');

module.exports = () => {
    const router = express.Router(); // eslint-disable-line new-cap

    router.route('/speakers')
        .get((request, response) => eventsService.getEvents()
            .then((events) => response.send(events))
            .catch(err => response.send(err)));

    return router;
};

