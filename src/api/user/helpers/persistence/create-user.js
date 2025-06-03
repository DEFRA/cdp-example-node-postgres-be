/**
 * Creates a single user within the users table in postgres.
 * @param { string } firstName
 * @param { string } lastName
 * @param { number } age
 * @param { import('pg-pool').Pool } db
 * @returns
 */
async function createUser(firstName, lastName, age, db) {
  const text =
    'INSERT INTO users(id, first_name, last_name, age) VALUES($1, $2, $3, $4) RETURNING *'

  const uuid = crypto.randomUUID()
  const values = [uuid, firstName, lastName, age]

  const res = await db.query(text, values)

  return res.rows[0]
}

export { createUser }
