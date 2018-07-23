const debug = require('debug')('supper-server:wechat')

const fp = require('fastify-plugin')
const WechatService = require('./wechatService')

module.exports = async (fastify, opts) => {

  /**
   *  logic Service
   */
  fastify.register(fp(
    async (fastify, opts) => {
      const wechatService = new WechatService(fastify)
      fastify.decorate('wechatService', wechatService)
    }
  ))

  /**
   *  register routes
   */
  fastify.register(registerRoutes)

}

async function registerRoutes(fastify, opts) {
  fastify.post('/suite/receive', async (request, reply) => {
    debug('/suite/receive request params body:', request.body)
    debug('/suite/receive request params query:', request.query)
    debug('/suite/receive request params headers:', request.headers)
    reply.code(200).send({
      success: true
    })
  })
}
