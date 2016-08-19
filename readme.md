#Web Purple Web Site
[![Build Status](https://travis-ci.org/kitos/web-purple.svg?branch=master)](https://travis-ci.org/kitos/web-purple)
[![Coverage Status](https://coveralls.io/repos/github/kitos/web-purple/badge.svg?branch=master)](https://coveralls.io/github/kitos/web-purple?branch=master)
[![Dependency status](https://david-dm.org/kitos/web-purple/status.png)](https://david-dm.org/kitos/web-purple#info=dependencies&view=table)
[![Dev Dependency Status](https://david-dm.org/kitos/web-purple/dev-status.png)](https://david-dm.org/kitos/web-purple#info=devDependencies&view=table)

##Database
[mongodb](https://www.mongodb.com/) is used in app (hosted on [mLab](https://mlab.com/welcome/)).

To change connection configuration see *src/server/conf/db.js*

For development purposes you can use next db:
```javascript
const host = 'ds064718.mlab.com';
const port = '64718';
const name = 'webpurple';
const user = 'admin';
const password = '123123';
```
or set up your own db (500mb fo free in [mLab](https://mlab.com/welcome/))

##Useful links
[redux](http://redux.js.org/)