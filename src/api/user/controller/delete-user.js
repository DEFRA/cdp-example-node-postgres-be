import isNull from 'lodash/isNull.js'
import Boom from '@hapi/boom'
import { statusCodes } from '~/src/api/common/constants/status-codes.js'
import { removeUser } from '~/src/api/user/helpers/persistence/remove-user.js'

const deleteUserController = {
  /**
   * @param { Request } request
   * @param { ResponseToolkit } h
   * @returns { Promise<*> }
   */
  handler: async (request, h) => {
    const entity = await removeUser(request.params.userId, request.db)
    if (isNull(entity)) {
      return Boom.boomify(Boom.notFound())
    }

    return h.response({ message: 'success', entity }).code(statusCodes.ok)
  }
}

export { deleteUserController }
