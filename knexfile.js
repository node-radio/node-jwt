require('dotenv').config();
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
