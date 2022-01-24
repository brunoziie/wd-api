import knex from 'knex';
import path from 'path';

export default knex({
  client: 'mysql',
  connection: {
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT as any,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  },
});
