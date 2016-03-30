var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var postSchema = Schema({
    text: String,
    imageLink: String,
    date: Date,
    author: {type: Schema.Types.ObjectId, ref: 'user'},
    fbPostId: String
});

module.exports = postSchema;
mongoose.model('post', postSchema);