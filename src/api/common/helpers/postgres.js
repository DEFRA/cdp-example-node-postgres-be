import { config } from '~/src/config/index.js'

import knex from 'knex'
import { newDb } from 'pg-mem'
import { MigrationSource } from '~/src/api/common/helpers/mygration.js'

const migrations = {
  migrationSource: new MigrationSource()
}

/**
 * @satisfies { import('@hapi/hapi').ServerRegisterPluginObject<*> }
 */
export const postgres =
  process.env.NODE_ENV === 'test'
    ? newDb().adapters.createKnex(0, {
        client: 'pg',
        migrations
      })
    : knex({
        client: 'pg',
        connection: {
          host: config.get('postgres.host'),
          port: config.get('postgres.port'),
          user: config.get('postgres.user'),
          database: config.get('postgres.database'),
          password: config.get('postgres.password'),
          ssl: config.get('postgres.ssl')
            ? { rejectUnauthorized: false }
            : false
        },
        migrations
      })

/**
 * To be mixed in with Request|Server to provide the db decorator
 * @typedef {{db: import('~/src/api/common/helpers/postgres.js').postgres }}
 */
