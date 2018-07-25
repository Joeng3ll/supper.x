const debug = require('debug')('supper-server:dishService')
const AbstractService = require('../AbstractService')
const assert = require('http-assert')
class MenuService extends AbstractService {
  constructort() {
    // super()
  }

  addMenu = async (userId, menu) => {
    assert(userId, 400, 'Params userId is required')
    assert(menu, 400, 'Params menu is required')
    debug('menuService collections:', this.collection)
  }
}


module.exports = MenuService
