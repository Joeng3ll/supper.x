const debug = require('debug')('supper-server:service')

export default (fastify, opts, next) => {
  /**
   *   用户相关
   */
  fastify.register(require('./users').default, {
    prefix: '/users'
  })

  /**
   *   点餐相关
   */
  fastify.register(require('./orders').default, {
    prefix: '/orders'
  })

  /**
   *  企业微信相关
   */
    fastify.register(require('./wechat').default, {
      prefix: '/wechat'
    })

  next()
}
