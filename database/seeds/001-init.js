exports.seed = async function (knex) {
  // Insert roles first
  await knex('roles').insert([
    { id: 1, name: 'admin' },
    { id: 2, name: 'user' },
  ]);

  // Now insert users
  await knex('users').insert([
    {
      username: 'admin',
      password: '$2a$08$CjOzAqkUXePlNyZCG6TKuubIY.MpjKqOdrV/W3178ah483kyEbeSe',
      role: 1, // This assumes role ID 1 corresponds to 'admin'
    },
  ]);
};
