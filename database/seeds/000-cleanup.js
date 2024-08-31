const { clean } = require('knex-cleaner');

exports.seed = async function (knex) {
  // Conditionally disable foreign keys only for SQLite
  if (knex.client.config.client === 'sqlite3') {
    await knex.raw('PRAGMA foreign_keys = OFF');
  }

  // Clean up the database
  await clean(knex, {
    mode: 'truncate',
    ignoreTables: ['knex_migrations', 'knex_migrations_lock'],
  });

  // Conditionally re-enable foreign keys only for SQLite
  if (knex.client.config.client === 'sqlite3') {
    await knex.raw('PRAGMA foreign_keys = ON');
  }
};
