const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = Schema({ // eslint-disable-line new-cap
    url: String,
    title: String,
    description: String,
    comment: String,
    image: String,
    date: Date,
    author: { type: Schema.Types.ObjectId, ref: 'user' },
    fbPostId: String,
    type: {
        type: String,
        enum: ['suggest'],
        required: false,
    },
});

module.exports = postSchema;
mongoose.model('post', postSchema);
