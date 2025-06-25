import { statusCodes } from '~/src/api/common/constants/status-codes.js'
import hapi from '@hapi/hapi'
import { failAction } from '~/src/api/common/helpers/fail-action.js'
import { health } from '~/src/api/health/index.js'

describe('#healthController', () => {
  /** @type {Server} */
  let server

  beforeAll(async () => {
    server = hapi.server({
      port: 15345,
      routes: {
        validate: {
          options: {
            abortEarly: false
          },
          failAction
        }
      },
      router: {
        stripTrailingSlash: true
      }
    })
    await server.register(health)
    await server.initialize()
  })

  afterAll(async () => {
    await server.stop({ timeout: 0 })
  })

  test('Should provide expected response', async () => {
    const { result, statusCode } = await server.inject({
      method: 'GET',
      url: '/health'
    })

    expect(result).toEqual({ message: 'success' })
    expect(statusCode).toBe(statusCodes.ok)
  })
})

/**
 * @import { Server } from '@hapi/hapi'
 */
