import { createUserController } from '~/src/api/user/controller/create-user.js'
import { getUsersController } from '~/src/api/user/controller/get-users.js'
import { getUserController } from '~/src/api/user/controller/get-user.js'
import { deleteUserController } from '~/src/api/user/controller/delete-user.js'

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
const users = {
  plugin: {
    name: 'users',
    register: (server) => {
      server.route([
        {
          method: 'GET',
          path: '/users',
          ...getUsersController
        },
        {
          method: 'GET',
          path: '/users/{userId}',
          ...getUserController
        },
        {
          method: 'DELETE',
          path: '/users/{userId}',
          ...deleteUserController
        },
        {
          method: 'POST',
          path: '/users',
          ...createUserController
        }
      ])
    }
  }
}

export { users }
