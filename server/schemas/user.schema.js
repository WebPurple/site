var mongoose = require('mongoose');

module.exports =  mongoose.Schema({
    email: String,
    /* VK */
    gender: String, // gender
    vkUserId: Number, // id
    vkUserName: String, // username
    vkDisplayName: String, // displayName
    vkProfileUrl: String, // profileUrl
    vkPhotoUrl: String // photos[0].value
});