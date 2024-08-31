const { clean } = require('knex-cleaner');

exports.seed = async function (knex) {
  // Check if table exists before cleaning
  const hasUsersTable = await knex.schema.hasTable('users');
  const hasRolesTable = await knex.schema.hasTable('roles');

  if (hasUsersTable && hasRolesTable) {
    // Disable foreign keys
    await knex.raw('PRAGMA foreign_keys = OFF');

    // Clean database
    await clean(knex, {
      mode: 'truncate',
      ignoreTables: ['knex_migrations', 'knex_migrations_lock'],
    });

    // Re-enable foreign keys
    await knex.raw('PRAGMA foreign_keys = ON');
  }
};
