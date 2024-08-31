const db = require("../../database/db-config")

function find() {
  
    return db("users as u")
      .join("roles as r", "u.role_id", "=", "r.role_id")
      .select("user_id", "username", "role_name")
}

function findBy(filter) {
  
  return db("users as u")
    .join("roles as r", "u.role_id", "=", "r.role_id") // Join on role_id
    .select("u.user_id", "u.username", "u.password", "r.role_name") // Selecting specific columns
    .where(filter); // Applying the filter condition
}



function findById(user_id) {
  
    return db("users as u")
      .join("roles as r", "u.role_id", "=", "r.role_id")
      .select("user_id", "username", "role_name")
      .where("user_id", user_id)
      .first()
}


async function add({ username, password, role_name }) { 
  let user;
  await db.transaction(async trx => {
    let role_id_to_use
    const [role] = await trx('roles').where('role_name', role_name)
    if (role) {
      role_id_to_use = role.role_id
    } else {
      const [role_id] = await trx('roles').insert({ role_name: role_name })
      role_id_to_use = role_id
    }
      user = await trx('users')
        .insert({ username: username, password: password, role_id: role_id_to_use } , ["user_id", "username"])   
  })
  return user
}

module.exports = {
  add,
  find,
  findBy,
  findById,
};