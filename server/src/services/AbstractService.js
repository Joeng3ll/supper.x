const debug = require('debug')('supper-server:abstractService')
class AbstractService {
  constructor({
    collection,
    errorCode
  } = {}) {
    this.collection = collection
    this.errorCode = errorCode
  }

}

module.exports = AbstractService
