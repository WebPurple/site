var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var expressSession = require('express-session');

var serverConf = require('./conf/server');
var dbConf = require('./conf/db');

var authApi = require('./controllers/auth.controller');
var postsApi = require('./controllers/posts.controller');

var app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(expressSession({
    name: serverConf.sessionCookieName,
    secret: serverConf.secretKey,
    resave: false,
    saveUninitialized: false
}));

app.use(express.static('public'));

authApi(app);

app.use('/api', postsApi());

mongoose.connect(`mongodb://${dbConf.user}:${dbConf.password}@${dbConf.host}:${dbConf.port}/${dbConf.dbName}`);
mongoose.connection
    .on('error', (err) => console.log(err))
    .once('open', () => {
        console.log('Connection to DB successful.');
        app.listen(serverConf.port, () => console.log(`Server is listening http://localhost:${serverConf.port}.`))
    });