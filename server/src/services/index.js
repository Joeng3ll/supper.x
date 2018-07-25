const debug = require('debug')('supper-server:service')

module.exports = (fastify, opts, next) => {
  /**
   *   用户相关
   */
  fastify.register(require('./user'), {
    prefix: '/user'
  })

  /**
   *  企业微信相关
   */
  fastify.register(require('./wechat'), {
    prefix: '/wechat'
  })

  next()
}
