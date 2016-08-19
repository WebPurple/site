const host = process.env.DB_HOST;
const port = process.env.DB_PORT;
const name = process.env.DB_NAME;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;

module.exports = {
    host,
    port,
    name,
    user,
    password,
    connectionUrl: `mongodb://${user}:${password}@${host}:${port}/${name}`,
};
