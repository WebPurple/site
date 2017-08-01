const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressSession = require('express-session');
const history = require('connect-history-api-fallback');
const compression = require('compression');

const morgan = require('morgan');

const serverConf = require('./conf/server');
const dbConf = require('./conf/db');

const authApi = require('./controllers/auth.controller');
const postsApi = require('./controllers/posts.controller');
const eventsApi = require('./controllers/events.controller');
const userApi = require('./controllers/user.controller');
const rssApi = require('./controllers/rss.controller');

const pageInfoApi = require('./controllers/page-info.controller');

const webpack = require('webpack');
// eslint-disable-next-line import/no-extraneous-dependencies
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConf = require('../../webpack.config');

const isProd = process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'travisci';

// Use native promises
mongoose.Promise = global.Promise;

const app = express();

if (!isProd) {
    app.use(morgan('dev'));
}

app.use(compression());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(history({
    rewrites: [
        { from: /\/rss/, to: '/rss' },
        { from: /\/auth/, to: context => context.parsedUrl.pathname },
        { from: /\/logout/, to: '/logout' },
    ],
}));

if (isProd) {
    app.use(express.static('__build__'));
} else {
    const compiler = webpack(webpackConf);
    app.use(webpackMiddleware(compiler, {
        publicPath: webpackConf.output.publicPath,
        hot: true,
    }));
    app.use(webpackHotMiddleware(compiler));
}

app.use(express.static('favicon'));
app.use(express.static('public'));

rssApi(app);

app.use(expressSession({
    name: serverConf.sessionCookieName,
    secret: serverConf.secretKey,
    resave: false,
    saveUninitialized: false,
}));

authApi(app);

app.use('/api', postsApi());
app.use('/api', eventsApi());
app.use('/api', userApi());
app.use('/', pageInfoApi());

// eslint-disable no-console
app.use((err, req, res, next) => {
    console.error(err.stack);
    if (res.headersSent) {
        next(err);
    } else {
        res.status(500)
            .json({ error: err.message });
    }
});

mongoose.connect(dbConf.connectionUrl);
mongoose.connection
    .on('error', err => console.log(err))
    .once('open', () => {
        console.log('Connection to DB successful.');
        app.listen(serverConf.port, () => console.log(`Server is listening http://${serverConf.host}:${serverConf.port}.`));
    });
