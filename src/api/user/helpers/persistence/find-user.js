/**
 * Database helper. Returns a user stored in the users table in postgres.
 * @param { string } userId
 * @param { Client } db
 * @returns {Promise<object>}
 */
async function findUser(userId, db) {
  await db.connect()
  const text = 'SELECT * FROM users WHERE id = $1'
  const values = [userId]
  const res = await db.query(text, values)
  await db.end()

  return res.rows
}

export { findUser }
