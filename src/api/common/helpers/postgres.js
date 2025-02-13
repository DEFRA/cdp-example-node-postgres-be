import knex from 'knex'
import { newDb } from 'pg-mem'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

import { config } from '~/src/config/index.js'

/**
 * @satisfies { import('@hapi/hapi').ServerRegisterPluginObject<*> }
 */

const dirname = path.dirname(fileURLToPath(import.meta.url))

const migrationsPath = path.resolve(
  dirname,
  '..',
  '..',
  '..',
  'knex',
  'migrations'
)

export const postgres =
  process.env.NODE_ENV === 'test'
    ? newDb().adapters.createKnex(0, {
        client: 'pg',
        migrations: {
          directory: migrationsPath,
          loadExtensions: ['.cjs']
        }
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
        migrations: {
          directory: migrationsPath,
          loadExtensions: ['.cjs']
        }
      })

/**
 * To be mixed in with Request|Server to provide the db decorator
 * @typedef {{db: import('~/src/api/common/helpers/postgres.js').postgres }}
 */
