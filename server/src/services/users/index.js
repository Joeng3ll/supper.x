const debug = require('debug')('supper-server:users')

const fp = require('fp')
const UserService = require('./userService')

module.exports = (fastify, opts) => {
  fastify.register(async function (fastify, opts) {

    /**
     *  register db
     */
    fastify.register(require('../../db').default)


  })
}
