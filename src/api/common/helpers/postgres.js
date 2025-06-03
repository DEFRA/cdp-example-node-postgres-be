import { config } from '~/src/config/index.js'
import Pool from 'pg-pool'
import { Signer } from '@aws-sdk/rds-signer'
import { fromNodeProviderChain } from '@aws-sdk/credential-providers'
import { createLogger } from '~/src/api/common/helpers/logging/logger.js'

const logger = createLogger()

/**
 * Returns a function that provides a postgres login.
 * If iamAuthentication
 */
function createPasswordProvider(options) {
  if (options.postgres.iamAuthentication) {
    return async () => {
      logger.info('requesting new IAM RDS token')
      const signer = new Signer({
        hostname: options.postgres.host,
        port: options.postgres.port,
        username: options.postgres.user,
        credentials: fromNodeProviderChain(),
        region: options.region
      })
      return await signer.getAuthToken()
    }
  }

  return () => options.postgres.localPassword
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
     * @param {{ postgres: {host: string, port: number, user: string, database: string}, region: string, isDevelopment: boolean }} options
     */
    register: function (server, options) {
      server.logger.info('Setting up Postgres')

      const passwordProvider = createPasswordProvider(options)
      const pool = new Pool({
        user: options.postgres.user,
        password: passwordProvider,
        host: options.postgres.host,
        port: options.postgres.port,
        database: options.postgres.database,
        maxLifetimeSeconds: 60 * 10, // This should be set to less than the RDS Token lifespan (15 minutes)
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

      server.decorate('server', 'db', pool)
      server.decorate('request', 'db', pool)
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
