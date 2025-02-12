import knex from 'knex'

/**
 * Database helper. Returns all objects stored in the example-data collection in mongodb.
 * See src/server/api/common/helpers/mongodb.js for an example of how the indexes are created for this collection.
 * @param { Db } db
 * @returns {Promise<WithId<Document>[]>}
 */
function findAllExampleData(db) {
  return db('example').select('*')
}

export { findAllExampleData }

/**
 * @import { Db, WithId, Document } from 'mongodb'
 */
