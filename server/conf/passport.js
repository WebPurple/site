var appConf = require('./server');

module.exports = {
    strategies: {
        vk: {
            clientID: '5360165',
            clientSecret: '765utMWmnVn9CS1kOuLB',
            callbackURL: `${appConf.protocol}://${appConf.host}:${appConf.port}/auth/vk/callback`
        }
    }
};