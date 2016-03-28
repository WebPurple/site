var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    email: String,
    /* VK */
    gender: String, // gender
    vkUserId: String, // id
    vkUserName: String, // username
    vkDisplayName: String, // displayName
    vkProfileUrl: String, // profileUrl
    vkPhotoUrl: String, // photos[0].value
    /* Facebook */
    fbUserId: String, // id
    fbDisplayName: String
});

module.exports = userSchema;
mongoose.model('user', userSchema);