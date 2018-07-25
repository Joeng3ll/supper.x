const debug = require('debug')('supper-server:users')

module.exports = async function (db, userCollection) {
  debug('userCollection name', userCollection.s.name)

  await db.createCollection(userCollection.s.name)

  await db.command({
    'collMod': userCollection.s.name,
    validator: {
      userid: {
        $type: 'string'
      },
      name: {
        $type: 'string'
      },
      gender: {
        $type: 'string'
      },
      avatar: {
        $type: 'string'
      }
    }
  })

  await db.createIndex({
    userid: 1
  }, {
    unique: true
  })
}
