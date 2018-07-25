const debug = require('debug')('supper-server:dishService')
class DishService {
  constructort(dishCollection) {
    this.dishCollection = dishCollection
  }
}


module.exports = DishService
