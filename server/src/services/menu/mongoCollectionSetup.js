const debug = require('debug')('supper-server:menu')

module.exports = async function (db, menuCollection) {
  debug('menuCollection name', menuCollection.s.name)

  await db.createCollection(menuCollection.s.name)

  await db.command({
    'collMod': menuCollection.s.name,
    validator: {
      menuid: {
        $type: 'string'
      },
      name: {
        $type: 'string'
      },
      creator: {
        $type: 'string'
      },
      avatar: {
        $type: 'string'
      }
    }
  })

  await db.createIndex({
    menuid: 1
  }, {
    unique: true
  })
}
