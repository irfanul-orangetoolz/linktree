const config = require('./config/config');

const app = require('./app');

console.log(config.dbName);

// eslint-disable-next-line no-unused-vars
const server = app.listen(config.port, () => {

    console.log(`Listening to port ${config.port}`);
});