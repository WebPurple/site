var appConf = require('./server');

module.exports = {
    strategies: {
        vk: {
            clientID: '5360165',
            clientSecret: '765utMWmnVn9CS1kOuLB',
            callbackURL: `${appConf.protocol}://${appConf.host}:${appConf.port}/auth/vk/callback`
        },

        fb: {
            clientID: '1094823327247465',
            clientSecret: 'cb8f46a70e9909769e411a41ba1df8b5',
            callbackURL: `${appConf.protocol}://${appConf.host}:${appConf.port}/auth/fb/callback`
        }
    }
};