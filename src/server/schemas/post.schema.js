const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = Schema({ // eslint-disable-line new-cap
    text: String,
    link: String,
    linkTitle: String,
    imageLink: String,
    date: Date,
    author: { type: Schema.Types.ObjectId, ref: 'user' },
    fbPostId: String,
});

module.exports = postSchema;
mongoose.model('post', postSchema);
