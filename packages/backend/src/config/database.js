// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

module.exports = {
    logging: (message) => {
        if (message.startsWith('Executing (default):')) {
            // ignore regular query logs
            return;
        }
        // log anything else (e.g. errors)
        console.error(message);
    },
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    dialectOptions:
        process.env.NODE_ENV === 'production'
            ? {
                  bigNumberStrings: true,
                  ssl: {
                      require: true,
                      rejectUnauthorized: false
                  }
              }
            : null,
    pool: {
        max: 50,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};
