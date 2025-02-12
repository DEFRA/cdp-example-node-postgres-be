// Update with your config settings.

import { config } from './src/config/index.js'
import { MigrationSource } from './src/api/common/helpers/mygration.js'

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
export default {
  client: 'pg',
  connection: {
    host: config.get('postgres.host'),
    port: config.get('postgres.port'),
    user: config.get('postgres.user'),
    database: config.get('postgres.database'),
    password: config.get('postgres.password'),
    ssl: config.get('postgres.ssl') ? { rejectUnauthorized: false } : false
  },
  migrations: {
    migrationSource: new MigrationSource()
  }
}
