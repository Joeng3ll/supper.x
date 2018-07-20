const debug = require('debug')('supper-server:service')

export default  (fastify,opts,next)=> {
  fastify.register(require('./users').default,{
    prefix: '/users'
  })

  next()
}
