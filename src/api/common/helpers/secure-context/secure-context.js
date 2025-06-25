import tls from 'node:tls'
import { getTrustStoreCerts } from '~/src/api/common/helpers/secure-context/get-trust-store-certs.js'
import { config } from '~/src/config/index.js'

/**
 * Creates a new secure context loaded from Base64 encoded certs
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const secureContext = {
  plugin: {
    name: 'secure-context',
    register(server) {
      const trustStoreCerts = getTrustStoreCerts(process.env)
      if (!config.get('isSecureContextEnabled')) return
      if (trustStoreCerts?.length > 0) {
        const originalTlsCreateSecureContext = tls.createSecureContext
        tls.createSecureContext = function (options = {}) {
          server.logger.info(
            `Found ${trustStoreCerts.length} TRUSTSTORE_ certificates to install`
          )

          const mergedCa = [
            ...(Array.isArray(options.ca)
              ? options.ca
              : options.ca
                ? [options.ca]
                : []),
            ...trustStoreCerts
          ]

          const newOptions = { ...options, ca: mergedCa }

          return originalTlsCreateSecureContext(newOptions)
        }
      } else {
        server.logger.warn(
          'No TRUSTSTORE_ certificates were found, using default secure context'
        )
      }

      server.decorate('server', 'secureContext', tls.createSecureContext())
    }
  }
}

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
