/**
 * Database helper. Removes a user stored in the users table in postgres.
 * @param { string } userId
 * @param { Client } db
 * @returns {Promise<object>}
 */
async function removeUser(userId, db) {
  await db.connect()
  const text = 'DELETE FROM users WHERE id = $1'
  const values = [userId]
  const res = await db.query(text, values)
  await db.end()

  return res.rows
}

export { removeUser }
