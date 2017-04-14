const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const talkFormat = {
    title: { type: String, default: null },
    speaker: { type: Schema.Types.ObjectId, ref: 'user', default: null },
    description: { type: String, default: null },
    links: {
        video: { type: String, default: null },
        presentation: { type: String, default: null },
    },
};

const eventSchema = Schema({ // eslint-disable-line new-cap
    title: { type: String, default: null },
    description: { type: String, default: null },
    image: { type: String, default: null },
    date: { type: Date, default: Date.now() },
    location: { type: String, default: null },
    talks: { type: [talkFormat], default: [] },
    tags: { type: [String], default: [] },
    attendees: { type: [{ type: Schema.Types.ObjectId, ref: 'user' }], default: [] },
    vkId: { type: Number, default: null },
});

module.exports = eventSchema;
mongoose.model('event', eventSchema);
