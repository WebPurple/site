var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    email: String,
    displayName: String,
    gender: Number, // 1 - male, 0 - female
    /* VK */
    vkUserId: String, // id
    vkUsername: String, // username
    vkProfileUrl: String, // profileUrl
    vkPhotoUrl: String, // photos[0].value
    /* Facebook */
    fbUserId: String // id
});

module.exports = userSchema;
mongoose.model('user', userSchema);