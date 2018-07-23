const debug = require('debug')('supper-server:userService')
class WechatService {
  constructor(collection) {
    this.collection = collection
  }

  getAccessTokenFromWechat = async () => {
    return 'test'
  }
}

module.exports = WechatService
