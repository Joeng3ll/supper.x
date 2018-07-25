const debug = require('debug')('supper-server:service')
const fp = require('fastify-plugin')

module.exports = (fastify, opts, next) => {
  /**
   *   用户相关
   */
  fastify.register(fp(async (fastify) => {
    fastify.register(require('./user'), {
      prefix: '/user'
    })
  }))

  /**
   *  企业微信相关
   */
  fastify.register(fp(async (fastify) => {
    fastify.register(require('./wechat'), {
      prefix: '/wechat'
    })
  }))

  /**
   *  菜单相关
   */
  fastify.register(fp(async (fastify) => {
    fastify.register(require('./menu'), {
      prefix: '/menu'
    })
  }))

  next()
}
