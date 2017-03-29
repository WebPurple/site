const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eventSchema = Schema({ // eslint-disable-line new-cap
    title: String,
    description: String,
    image: String,
    date: Date,
    location: String,
    talks: [{
        title: String,
        speaker: { type: Schema.Types.ObjectId, ref: 'user' },
    }],
    tags: [String],
});

module.exports = eventSchema;
mongoose.model('event', eventSchema);
