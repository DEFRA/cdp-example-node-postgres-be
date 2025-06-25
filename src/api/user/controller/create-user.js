import Joi from 'joi'
import { createUser } from '~/src/api/user/helpers/persistence/create-user.js'
import isNull from 'lodash/isNull.js'
import Boom from '@hapi/boom'
import { statusCodes } from '~/src/api/common/constants/status-codes.js'

const createUserController = {
  options: {
    validate: {
      payload: Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        age: Joi.number().required()
      })
    }
  },
  /**
   * @param { Request } request
   * @param { ResponseToolkit } h
   * @returns { Promise<*> }
   */
  handler: async (request, h) => {
    const { firstName, lastName, age } = request.payload
    const entity = await createUser(firstName, lastName, age, request.pg)
    if (isNull(entity)) {
      return Boom.boomify(Boom.notFound())
    }

    return h.response({ message: 'success', entity }).code(statusCodes.ok)
  }
}

export { createUserController }
