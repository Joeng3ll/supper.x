const debug = require('debug')('supper-server:userService')
class UserService {
  constructort(userCollection){
    this.userCollection = userCollection
  }
}


module.exports = UserService
