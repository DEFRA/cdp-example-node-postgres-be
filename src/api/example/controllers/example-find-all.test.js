import { createServer } from '~/src/api/index.js'
import { statusCodes } from '~/src/api/common/constants/status-codes.js'

describe('#exampleFindAllController', () => {
  /** @type {Server} */
  let server

  beforeAll(async () => {
    server = await createServer()
    await server.initialize()
  })

  afterEach(async () => {
    await server.db('example').delete({})
  })

  afterAll(async () => {
    await server.stop({ timeout: 0 })
  })

  test('Should provide expected response', async () => {
    await server.db('example').insert([
      { name: 'four', type: 123.45 },
      { name: 'five', type: 999.99 }
    ])

    const { result, statusCode } = await server.inject({
      method: 'GET',
      url: '/example'
    })

    expect(result).toEqual({
      message: 'success',
      entities: [
        { id: 1, name: 'four', type: 123.45 },
        { id: 2, name: 'five', type: 999.99 }
      ]
    })
    expect(statusCode).toBe(statusCodes.ok)
  })
})

/**
 * @import { Server } from '@hapi/hapi'
 */
