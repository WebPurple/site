const mongoose = require('mongoose');

const userSchema = mongoose.Schema({ // eslint-disable-line new-cap
    email: String,
    displayName: String,
    gender: Number, // 1 - male, 0 - female
    jobTitle: String,
    roles: [String],
    /* VK */
    vkUserId: String, // id
    vkUsername: String, // username
    vkProfileUrl: String, // profileUrl
    vkPhotoUrl: String, // photos[0].value
    /* Facebook */
    fbUserId: String, // id
    longLiveAccessToken: String,
});

module.exports = userSchema;
mongoose.model('user', userSchema);
