import { createServer } from '~/src/api/index.js'
import { statusCodes } from '~/src/api/common/constants/status-codes.js'

describe('#exampleFindAllController', () => {
  /** @type {Server} */
  let server

  beforeAll(async () => {
    server = await createServer()
    await server.initialize()
  })

  beforeEach(async () => {
    await server.db('example').insert([
      { name: 'four', type: 123.45 },
      { name: 'five', type: 999.99 }
    ])
  })

  afterEach(async () => {
    await server.db('example').delete({})
  })

  afterAll(async () => {
    await server.db.destroy()
    await server.stop({ timeout: 0 })
  })

  test('Should provide expected response', async () => {
    const { result, statusCode } = await server.inject({
      method: 'GET',
      url: '/example'
    })

    expect(result).toEqual({
      message: 'success',
      entities: [
        { id: 2, name: 'four', type: 123.45 },
        { id: 23, name: 'five', type: 999.99 }
      ]
    })
    expect(statusCode).toBe(statusCodes.ok)
  })
})

/**
 * @import { Server } from '@hapi/hapi'
 */
