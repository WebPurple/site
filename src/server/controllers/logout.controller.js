const serverConf = require('../conf/server');

module.exports = (app) => {
    app.get('/logout', (req, res) => {
        res.clearCookie(serverConf.sessionCookieName);
        res.redirect('/');
    });
};
