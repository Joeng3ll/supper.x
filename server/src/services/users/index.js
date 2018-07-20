const debug = require('debug')('supper-server:users')

const fp = require('fp')
const UserService = require('./userService')

module.exports = (fastify, opts) => {
  fastify.register(async function (fastify, opts) {

    /**
     *  register db
     */
    fastify.register(require('../../db').default)

    /**
     *   create login object and store it in the fastify instance
     *   and use fp() to ask to fastify don't encapsulate decorateWithUserCollection
     */
    fastify.register(fp(async function decorateWithUserCollection(fastify, opts) {
      fastify.decorate('userCollection', fastify.mongo.db.collection('users'))
    }))

    /**
     *   Mongodb has no schema but we need to specify some indexes and validators
     */
    fastify.register(async function (fastify, opts) {
      require('./mongoCollectionSetup')(fastify.mongo.db, fastify.userCollection)
    })

    /**
     *   add logic business interface
     */
    fastify.register(fp(async function (fastify, opts) {
      const userService = new UserService(fastify.userCollection)
      fastify.decorate('userService', userService)
    }))

    /**
     *  register routes
     */
    fastify.register(registerRoutes)

  })
}

async function registerRoutes(fastify, opts) {
  fastiry.get('', async (request, reply) => {

  })
}
