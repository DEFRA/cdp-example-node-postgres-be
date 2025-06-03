/**
 * Database helper. Returns all users stored in the users table in postgres.
 * @param { import('pg-pool').Pool } db
 * @returns {Promise<object>}
 */
async function findAllUsers(db) {
  const text = 'SELECT * FROM users'
  const res = await db.query(text)

  return res.rows
}

export { findAllUsers }
