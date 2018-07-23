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
  /**
   *  1、获取access_token
   *  @param {string} corpid
   *  @param {string} corpsecret
   *  @return {string} access_token
   *  @return {number} expires_in token有效期限
   *  需要缓存和重新获取 access_token
   */
  fastify.get('/', async (request, reply) => {
    debug('get_access_token')
    const access_token = await fastify.wechatService.getAccessTokenFromWechat()
    reply.code(200).send({
      access_token
    })
  })
}
