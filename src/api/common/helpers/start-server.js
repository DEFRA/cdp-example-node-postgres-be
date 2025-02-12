import { config } from '~/src/config/index.js'

import { createServer } from '~/src/api/index.js'
import { createLogger } from '~/src/api/common/helpers/logging/logger.js'
import { postgres } from '~/src/api/common/helpers/postgres.js'

async function startServer() {
  let server

  try {
    server = await createServer(postgres)
    await server.start()

    server.logger.info('Server started successfully')
    server.logger.info(
      `Access your backend on http://localhost:${config.get('port')}`
    )
  } catch (error) {
    const logger = createLogger()
    logger.info('Server failed to start :(')
    logger.error(error)
  }

  return server
}

export { startServer }
