/**
 * Creates a single record within postgres.
 * @param { Knex } db
 * @param { string } name
 * @param { number } type
 * @returns
 */
function createExampleData(db, name, type) {
  return db('example').insert({ name, type }).returning('id')
}

export { createExampleData }
