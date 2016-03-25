var mongoose = require('mongoose');

var postSchema = mongoose.Schema({
    text: String,
    date: Date,
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'user'}
});

module.exports = postSchema;
mongoose.model('post', postSchema);