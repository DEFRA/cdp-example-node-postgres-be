/**
 * Database helper. Returns a user stored in the users table in postgres.
 * @param { string } userId
 * @param { import('pg-pool').Pool } db
 * @returns {Promise<object>}
 */
async function findUser(userId, db) {
  const text = 'SELECT * FROM users WHERE id = $1'
  const values = [userId]
  const res = await db.query(text, values)

  return res.rows
}

export { findUser }
