import isNull from 'lodash/isNull.js'
import Boom from '@hapi/boom'
import { statusCodes } from '~/src/api/common/constants/status-codes.js'

import { findUser } from '~/src/api/user/helpers/persistence/find-user.js'

const getUserController = {
  /**
   * @param { Request } request
   * @param { ResponseToolkit } h
   * @returns { Promise<*> }
   */
  handler: async (request, h) => {
    const entity = await findUser(request.params.userId, request.db)
    if (isNull(entity)) {
      return Boom.boomify(Boom.notFound())
    }

    return h.response({ message: 'success', entity }).code(statusCodes.ok)
  }
}

export { getUserController }
