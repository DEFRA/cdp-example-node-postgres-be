import { createServer } from '~/src/api/index.js'
import { postgres } from '~/src/api/common/helpers/postgres.js'

describe.only('#postgres-other', () => {
  /** @type {Server} */
  let server

  describe('#postgres', () => {
    beforeAll(async () => {
      server = await createServer()
      await server.initialize()

      await postgres.migrate.up()
    })

    afterAll(async () => {
      await server.db.stop({ timeout: 0 })
    })

    test('Should be able to query migration table', async () => {
      await server.db.insert({ name: 'example', type: 'test' }).into('example')

      await expect(server.db.select('*').from('example')).resolves.toEqual([
        { id: 1, name: 'example', type: 'test' }
      ])
    })
  })
})

/**
 * @import { Server } from '@hapi/hapi'
 */
