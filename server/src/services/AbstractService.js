const debug = require('debug')('supper-server:abstractService')
class AbstractService {
  constructor({
    collection
  } = {}) {
    this.collection = collection
  }
}

module.exports = AbstractService
