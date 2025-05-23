import { config } from '~/src/config/index.js'
import pg from 'pg'
import { Signer } from '@aws-sdk/rds-signer'
import { fromNodeProviderChain } from '@aws-sdk/credential-providers'

const { Client } = pg

async function getToken(options) {
  let token
  if (options.postgres.iamAuthentication) {
    const signer = new Signer({
      hostname: options.postgres.host,
      port: options.postgres.port,
      username: options.postgres.user,
      credentials: fromNodeProviderChain(),
      region: options.region
    })
    token = await signer.getAuthToken()
  } else {
    token = 'admin'
  }
  return token
}

/**
 * @satisfies { import('@hapi/hapi').ServerRegisterPluginObject<*> }
 */
export const postgres = {
  plugin: {
    name: 'postgres',
    version: '1.0.0',
    /**
     *
     * @param { import('@hapi/hapi').Server } server
     * @param { postgres: object, region: string, isDevelopment: boolean } options
     * @returns {Promise<void>}
     */
    register: function (server, options) {
      server.logger.info('Setting up Postgres')

      const db = async () =>
        new Client({
          user: options.postgres.user,
          password: await getToken(options),
          host: options.postgres.host,
          port: options.postgres.port,
          database: options.postgres.database,
          ...(server.secureContext && {
            ssl: {
              rejectUnauthorized: false,
              secureContext: server.secureContext
            }
          })
        })

      server.logger.info(
        `Postgres connected to database '${options.postgres.database}'`
      )

      server.decorate('server', 'db', db)
      server.decorate('request', 'db', db)
    }
  },
  options: {
    postgres: config.get('postgres'),
    region: config.get('awsRegion')
  }
}

//
// /**
//  * To be mixed in with Request|Server to provide the db decorator
//  * @typedef {{db: import('~/src/api/common/helpers/postgres.js').postgres }}
//  */
