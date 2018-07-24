const debug = require('debug')('supper-server:wechat')

const fp = require('fastify-plugin')

const WechatService = require('./wechatService')
const WechatCache = require('../../utils/cache')

// TODO add config to global config
const LRU_OPTIONS = {
  // max: 500,
  lenth: function (n, key) {
    return n * 2 + key.length
  },
  // dispose: function (key, n) {
    // n.close()
  // },
  maxAge: 7200
}


module.exports = async (fastify, opts) => {

  /**
   *  logic Service
   */
  fastify.register(fp(
    async (fastify, opts) => {
      const wechatService = new WechatService(fastify.config.get('wechat'))
      fastify.decorate('wechatService', wechatService)
    }
  ))

  /**
   *  cache
   */
  fastify.register(fp(
    async (fastify, opts) => {
      const wechatCache = new WechatCache(LRU_OPTIONS)
      fastify.decorate('wechatCache', wechatCache)
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
  fastify.get('/get_access_token', async (request, reply) => {
    const CACHE_KEY = 'access_token'
    let cache_token = fastify.wechatCache.get(CACHE_KEY)
    debug('=== getAccessTokenFromCache:', cache_token)
    if (!cache_token) {
      cache_token = await fastify.wechatService.getAccessTokenFromWechat()
      debug('=== getAccessTokenFromWechat:', cache_token)
      fastify.wechatCache.set(CACHE_KEY, cache_token)
    }
    reply.code(200).send({
      cache_token
    })
  })
}
