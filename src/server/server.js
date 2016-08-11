var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var expressSession = require('express-session');
var history = require('connect-history-api-fallback');

var serverConf = require('./conf/server');
var dbConf = require('./conf/db');

var authApi = require('./controllers/auth.controller');
var postsApi = require('./controllers/posts.controller');
var userApi = require('./controllers/user.controller');

var pageInfoApi = require('./controllers/page-info.controller');

var app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(history({
    rewrites: [
        {from: /\/auth/, to: context => context.parsedUrl}
    ]
}));

app.use(express.static('public'));

app.use(expressSession({
    name: serverConf.sessionCookieName,
    secret: serverConf.secretKey,
    resave: false,
    saveUninitialized: false
}));

authApi(app);

app.use('/api', postsApi());
app.use('/api', userApi());
app.use('/', pageInfoApi());

var PORT = process.env.PORT || serverConf.port;

mongoose.connect(`mongodb://${dbConf.user}:${dbConf.password}@${dbConf.host}:${dbConf.port}/${dbConf.dbName}`);
mongoose.connection
    .on('error', (err) => console.log(err))
    .once('open', () => {
        console.log('Connection to DB successful.');
        app.listen(PORT, () => console.log(`Server is listening http://${serverConf.host}:${PORT}.`))
    });