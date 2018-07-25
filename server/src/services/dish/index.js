const debug = require('debug')('supper-server:dish')

const fp = require('fastify-plugin')
const DishService = require('./dishService')

module.exports = async (fastify, opts) => {
  fastify.register(async function (fastify, opts) {

    /**
     *  register db
     */
    fastify.register(require('../../db').default)

    /**
     *   create login object and store it in the fastify instance
     *   and use fp() to ask to fastify don't encapsulate decorateWithDishCollection
     */
    fastify.register(fp(async function decorateWithDishCollection(fastify, opts) {
      fastify.decorate('dishCollection', fastify.mongo.db.collection('dish'))
    }))

    /**
     *   Mongodb has no schema but we need to specify some indexes and validators
     */
    fastify.register(async function (fastify, opts) {
      require('./mongoCollectionSetup')(fastify.mongo.db, fastify.dishCollection)
    })

    /**
     *   add logic business interface
     */
    fastify.register(fp(async function (fastify, opts) {
      const dishService = new DishService(fastify.dishCollection)
      fastify.decorate('dishService', dishService)
    }))

    /**
     *  register routes
     */
    fastify.register(registerRoutes)

  })
}

async function registerRoutes(fastify, opts) {
  fastify.get('/', async (request, reply) => {
    debug('test dishRoutes')
  })
}
