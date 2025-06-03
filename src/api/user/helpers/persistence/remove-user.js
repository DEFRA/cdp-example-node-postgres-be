/**
 * Database helper. Removes a user stored in the users table in postgres.
 * @param { string } userId
 * @param { import('pg-pool').Pool } db
 * @returns {Promise<object>}
 */
async function removeUser(userId, db) {
  const text = 'DELETE FROM users WHERE id = $1'
  const values = [userId]
  const res = await db.query(text, values)

  return res.rows
}

export { removeUser }
