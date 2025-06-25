import isNull from 'lodash/isNull.js'
import Boom from '@hapi/boom'
import { statusCodes } from '~/src/api/common/constants/status-codes.js'
import { findAllUsers } from '~/src/api/user/helpers/persistence/find-all-users.js'

const getUsersController = {
  /**
   * @param { Request } request
   * @param { ResponseToolkit } h
   * @returns { Promise<*> }
   */
  handler: async (request, h) => {
    const entity = await findAllUsers(request.pg)
    if (isNull(entity)) {
      return Boom.boomify(Boom.notFound())
    }

    return h.response({ message: 'success', entity }).code(statusCodes.ok)
  }
}

export { getUsersController }
