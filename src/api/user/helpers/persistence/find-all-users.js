/**
 * Database helper. Returns all users stored in the users table in postgres.
 * @param { Client } db
 * @returns {Promise<object>}
 */
async function findAllUsers(db) {
  await db.connect()
  const text = 'SELECT * FROM users'

  const res = await db.query(text)
  await db.end()

  return res.rows
}

export { findAllUsers }
