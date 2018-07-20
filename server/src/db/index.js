const debug = require('debug')('supper-server:db')

import fp from 'fastify-plugin'

export default fp((fastify,opts,next)=>{
  fastify.register(require('fastify-mongodb'),{
    // force to close the mongodb when app stoped
    forceClose: true,
    useNewUrlParser: true,
    url: 'mongodb://127.0.0.1:27017/test'
  })
  next()
})
