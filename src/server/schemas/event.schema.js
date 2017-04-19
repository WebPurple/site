const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const required = type => ({ type, required: true });

const eventSchema = Schema({ // eslint-disable-line new-cap
    title: required(String),
    description: required(String),
    image: String,
    date: required(Date),
    location: required(String),
    talks: [{
        title: required(String),
        speaker: { type: Schema.Types.ObjectId, ref: 'user' },
    }],
    tags: [String],
});

module.exports = eventSchema;
mongoose.model('event', eventSchema);
