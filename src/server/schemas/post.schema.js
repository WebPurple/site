var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var postSchema = Schema({
    text: String,
    link: String,
    linkTitle: String,
    imageLink: String,
    date: Date,
    author: {type: Schema.Types.ObjectId, ref: 'user'},
    fbPostId: String
});

module.exports = postSchema;
mongoose.model('post', postSchema);