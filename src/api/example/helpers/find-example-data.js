/**
 * Finds and returns a single example record from postgres.
 * @param { Knex } db
 * @param { string } id
 * @returns
 */
function findExampleData(db, id) {
  return db('example').select('*').where('id', id)
}

export { findExampleData }
