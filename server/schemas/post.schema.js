var mongoose = require('mongoose');

module.exports = mongoose.Schema({
    text: String,
    date: Date,
    author: String,
    title: String
});