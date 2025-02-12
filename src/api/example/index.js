import {
  exampleFindOneController,
  exampleFindAllController
} from '~/src/api/example/controllers/index.js'
import { exampleCreateOneController } from '~/src/api/example/controllers/example-create-one.js'

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
const example = {
  plugin: {
    name: 'example',
    register: (server) => {
      server.route([
        {
          method: 'GET',
          path: '/example',
          ...exampleFindAllController
        },
        {
          method: 'GET',
          path: '/example/{exampleId}',
          ...exampleFindOneController
        },
        {
          method: 'POST',
          path: '/example',
          ...exampleCreateOneController
        }
      ])
    }
  }
}

export { example }

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
