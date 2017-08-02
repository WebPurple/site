const bcrypt = require('bcrypt');

const appConf = require('./server');

const salt = bcrypt.genSalt(process.env.SALT_ROUNDS || 10); // It's a `Promise<__SALT__>`

module.exports = {
    strategies: {
        vk: {
            clientID: '5360165',
            clientSecret: '765utMWmnVn9CS1kOuLB',
            callbackURL: process.env.VK_CALLBACK_URL || `${appConf.protocol}://${appConf.host}:${appConf.port}/auth/vk/callback`,
            groupId: '-94098151', // `-` used to describe to VK that this ID is group ID (not user ID)
        },

        fb: {
            clientID: process.env.FB_CLIENT_ID,
            clientSecret: process.env.FB_CLIENT_SECRET,
            callbackURL: process.env.FB_CALLBACK_URL || `${appConf.protocol}://${appConf.host}:${appConf.port}/auth/fb/callback`,
        },
        local: {
            hashPassword: password => salt.then(saltString => bcrypt.hash(password, saltString)), // It's a Promise<_hash_>
        }
    },
};
