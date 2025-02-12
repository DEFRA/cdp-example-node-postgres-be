import Boom from '@hapi/boom'
import isNull from 'lodash/isNull.js'
import { statusCodes } from '~/src/api/common/constants/status-codes.js'
import { createExampleData } from '~/src/api/example/helpers/create-example-data.js'
import Joi from 'joi'

/**
 * @satisfies {Partial<ServerRoute>}
 */
const exampleCreateOneController = {
  options: {
    validate: {
      payload: Joi.object({
        name: Joi.string().min(3).max(32).required(),
        type: Joi.number().required()
      })
    }
  },
  /**
   * @param { Request } request
   * @param { ResponseToolkit } h
   * @returns { Promise<*> }
   */
  handler: async (request, h) => {
    const { name, type } = request.payload
    const entity = await createExampleData(request.db, name, type)
    if (isNull(entity)) {
      return Boom.boomify(Boom.notFound())
    }

    return h.response({ message: 'success', entity }).code(statusCodes.ok)
  }
}

export { exampleCreateOneController }

/**
 * @import { Request, ResponseToolkit, ServerRoute} from '@hapi/hapi'
 * @import { MongoDBPlugin } from '~/src/api/common/helpers/mongodb.js'
 */
