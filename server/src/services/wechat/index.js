const debug = require('debug')('supper-server:wechat')

const fp = require('fp')
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
  fastify.get('/suite/receive',)
}
