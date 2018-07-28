const debug = require('debug')('supper-server:dishService')
const AbstractService = require('../AbstractService')
const assert = require('http-assert')
class MenuService extends AbstractService {
  constructort() {
    // super()
  }

  addMenu = async (creator, menu) => {
    assert(creator, 400, 'Params creator is required')
    assert(menu, 400, 'Params menu is required')

  }
}


module.exports = MenuService
