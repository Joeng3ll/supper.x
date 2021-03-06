const debug = require('debug')('supper-server:wechat')

const fp = require('fastify-plugin')
const assert = require('http-assert')

const Boom = require('boom')
const WechatService = require('./wechatService')
const WechatCache = require('../../utils/cache')

// TODO add config to global config
const LRU_OPTIONS = {
  // max: 500,
  lenth: function (n, key) {
    return n * 2 + key.length
  },
  // TODO 缓存时间根据接口返回更新
  maxAge: 7200 * 1000
}


/**
 *  fp()   在service中调用其他service
 */
module.exports = fp(async (fastify, opts) => {

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
   *  logic Service
   */
  fastify.register(fp(
    async (fastify, opts) => {
      const wechatService = new WechatService(fastify.config.get('wechat'), fastify.wechatCache, {
        errorCode: fastify.errorCode
      })
      fastify.decorate('wechatService', wechatService)
    }
  ))

  /**
   *  register routes
   */
  fastify.register(registerRoutes)

})

async function registerRoutes(fastify, opts) {
  /**
   *  1、获取access_token
   */
  fastify.get('/get_access_token', async (request, reply) => {
    const cache_token = await fastify.wechatService.getAccessToken()
    reply.code(200).send({
      cache_token
    })
  })

  /**
   *  2、获取用户信息
   */
  fastify.get('/get_user_ticket', async (request, reply) => {
    const {
      code
    } = request.query
    assert(code, 'code required')
    const user_ticket = await fastify.wechatService.getUserTicket(code)
    reply.code(200).send({
      user_ticket
    })
  })

  /**
   *  获取用户详情
   */
  fastify.get('/get_user_detail', async (request, reply) => {
    const {
      code
    } = request.query
    assert(code, 'code required')
    const user_ticket = await fastify.wechatService.getUserTicket(code)
    const userDetail = await fastify.wechatService.getUserDetail(user_ticket)
    debug(' ===getUserDetail:=== ', userDetail)
    reply.code(200).send({
      ...userDetail,
    })
  })

}
