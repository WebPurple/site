const host = 'ds064718.mlab.com';
const port = '64718';
const name = 'webpurple';
const user = 'admin';
const password = '123123';

module.exports = {
    host,
    port,
    name,
    user,
    password,
    connectionUrl: `mongodb://${user}:${password}@${host}:${port}/${name}`,
};
