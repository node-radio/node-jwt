require('dotenv').config();
/*
  // for sqlite
  PORT=9000
  NODE_ENV=development
  DEV_DATABASE_URL=sqlite://./database/auth.db3
  TESTING_DATABASE_URL=sqlite://./database/test.db3
  DATABASE_URL=postgresql://user:password@host:port/database_name

  youtube: JSON Web Tokens - https://www.youtube.com/watch?v=IT8dslw243E

  // for postgresql
  PORT=9000
  NODE_ENV=development
  DEV_DATABASE_URL=postgresql://postgres:password@localhost:5432/database_name
  TESTING_DATABASE_URL=postgresql://postgres:password@localhost:5432/testing_database_name

  Put the above in your .env file. Some adjustments in the connection URLs will be needed:

    - 5432 (this is the default TCP port for PostgreSQL, should work as is)
    - postgres (in postgres:password, this is the default superadmin user, might work as is)
    - password (in postgres:password, replace with the actual password of the postgres user)
    - database_name (use the real name of the development database you created in pgAdmin 4)
    - testing_database_name (use the real name of the testing database you created in pgAdmin 4)

*/
const pg = require('pg');

// Configure SSL for Heroku PostgreSQL
if (process.env.DATABASE_URL) {
  pg.defaults.ssl = { rejectUnauthorized: false };
}

const sharedConfig = {
  migrations: { directory: './database/migrations' },
  seeds: { directory: './database/seeds' },
};

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './database/auth.db3',
    },
    useNullAsDefault: true,
    pool: {
      afterCreate: (conn, done) => {
        conn.run('PRAGMA foreign_keys = ON', done);
      },
    },
    ...sharedConfig,
  },

  testing: {
    client: 'sqlite3',
    connection: {
      filename: './database/test.db3',
    },
    useNullAsDefault: true,
    pool: {
      afterCreate: (conn, done) => {
        conn.run('PRAGMA foreign_keys = ON', done);
      },
    },
    ...sharedConfig,
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    pool: { min: 2, max: 10 },
    ...sharedConfig,
  },
};
