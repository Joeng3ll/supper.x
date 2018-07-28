const debug = require('debug')('supper-server:menu')

const fp = require('fastify-plugin')
const assert = require('http-assert')
const MenuService = require('./menuService')

const {
  addMenu: addMenuOpts
} = require('./schema')

module.exports = async (fastify, opts) => {
  fastify.register(async function (fastify, opts) {

    /**
     *  register db
     */
    fastify.register(require('../../db').default)

    /**
     *   create login object and store it in the fastify instance
     *   and use fp() to ask to fastify don't encapsulate decorateWithMenuCollection
     */
    fastify.register(fp(async function decorateWithMenuCollection(fastify, opts) {
      fastify.decorate('menuCollection', fastify.mongo.db.collection('menu'))
    }))

    /**
     *   Mongodb has no schema but we need to specify some indexes and validators
     */
    fastify.register(async function (fastify, opts) {
      require('./mongoCollectionSetup')(fastify.mongo.db, fastify.menuCollection)
    })

    /**
     *   add logic business interface
     */
    fastify.register(fp(async function (fastify, opts) {
      const menuService = new MenuService({
        collection: fastify.menuCollection
      })
      fastify.decorate('menuService', menuService)
    }))

    /**
     *  register routes
     */
    fastify.register(registerRoutes)

  })
}

async function registerRoutes(fastify, opts) {
  /**
   *  添加菜单
   */
  fastify.post('/addMenu', addMenuOpts, async (request, reply) => {
    const {
      user_ticket,
      menu
    } = request.body
    const {
      userid:creator
    } = await fastify.wechatService.getUserDetail(user_ticket)
    fastify.menuService.addMenu(creator, menu)
    reply.code(200).send({
      // ...userDetail
      userid
    })
  })
}
