const debug = require('debug')('supper-server:dish')

module.exports = async function (db, dishCollection) {
  debug('dishCollection name', dishCollection.s.name)

  await db.createCollection(dishCollection.s.name)

  await db.command({
    'collMod': dishCollection.s.name,
    validator: {
      dishid: {
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
    dishid: 1
  }, {
    unique: true
  })
}
