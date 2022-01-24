require('dotenv').config();

const path = require('path');

module.exports = {
  development: {
    client: 'mysql',
    connection: {
      host: process.env.MYSQL_HOST,
      port: process.env.MYSQL_PORT,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
    },
    migrations: {
      tableName: '__migrations__',
      directory: 'app/database/migrations',
    },
    seeds: {
      directory: 'app/database/seeds',
    },
  },
};
