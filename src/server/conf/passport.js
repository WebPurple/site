const appConf = require('./server');

module.exports = {
    strategies: {
        vk: {
            clientID: '5360165',
            clientSecret: '765utMWmnVn9CS1kOuLB',
            callbackURL: process.env.VK_CALLBACK_URL || `${appConf.protocol}://${appConf.host}:${appConf.port}/auth/vk/callback`,
        },

        fb: {
            clientID: process.env.FB_CLIENT_ID,
            clientSecret: process.env.FB_CLIENT_SECRET,
            callbackURL: process.env.FB_CALLBACK_URL || `${appConf.protocol}://${appConf.host}:${appConf.port}/auth/fb/callback`,
        },
    },
};
