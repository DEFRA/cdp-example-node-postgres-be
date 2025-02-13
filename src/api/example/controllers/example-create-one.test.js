import { createServer } from '~/src/api/index.js'
import { statusCodes } from '~/src/api/common/constants/status-codes.js'

describe('#exampleCreateOneController', () => {
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
    const { result, statusCode } = await server.inject({
      method: 'POST',
      url: '/example',
      payload: {
        name: 'sample',
        type: 100.99
      }
    })

    expect(result).toEqual({
      message: 'success',
      entity: [{ id: 1 }]
    })
    expect(statusCode).toBe(statusCodes.ok)
  })
})

/**
 * @import { Server } from '@hapi/hapi'
 */
