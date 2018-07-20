const debug = require('debug')('supper-server:users')

module.exports = async function (db, userCollection) {
  debug('userCollection name', userCollection.s.name)

  await db.createCollection(userCollection.s.name)

  await db.command({
    'collMod': userCollection.s.name,
    validator: {
      username: {
        $type: 'string'
      },
      password: {
        $type: 'string'
      }
    }
  })

  await db.createIndex({
    username: 1
  }, {
    unique: true
  })
}
