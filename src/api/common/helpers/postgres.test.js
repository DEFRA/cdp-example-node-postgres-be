import { createServer } from '~/src/api/index.js'
import { postgres } from '~/src/api/common/helpers/postgres.js'

describe('#postgres', () => {
  /** @type {Server} */
  let server

  describe('Set up', () => {
    beforeAll(async () => {
      server = await createServer()
      await server.initialize()

      postgres.migrate.up()

      await postgres.schema.createTable('example', (table) => {
        table.increments('id')
        table.string('name')
        table.string('value')
      })
    })

    afterAll(async () => {
      await server.db.stop({ timeout: 0 })
    })

    test('Server should have expected Postgres decorators', () => {
      expect(server.db).toBeInstanceOf(postgres)
    })

    test('MongoDb should have expected database name', () => {
      expect(server.db.databaseName).toBe('cdp-example-node-postgres-be')
    })

    test('MongoDb should have expected namespace', () => {
      expect(server.db.namespace).toBe('cdp-example-node-postgres-be')
    })
  })

  describe('Shut down', () => {
    beforeAll(async () => {
      server = await createServer()
      await server.initialize()
    })

    test('Should close Mongo client on server stop', async () => {
      const closeSpy = jest.spyOn(server.mongoClient, 'close')
      await server.stop({ timeout: 0 })

      expect(closeSpy).toHaveBeenCalledWith(true)
    })
  })
})

/**
 * @import { Server } from '@hapi/hapi'
 */
