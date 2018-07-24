const debug = require('debug')('supper-server:wechatService')

const Boom = require('boom')
const assert = require('assert')

const http = require('../../utils/http')
class WechatService {
  constructor(config) {
    this.config = config
  }

  getAccessTokenFromWechat = async () => {
    const url = `https://${this.config.host}/cgi-bin/gettoken?corpid=${this.config.corpid}&corpsecret=${this.config.corpsecret}`
    return http(url).then((res) => {
      debug('=== getAccessTokenFromWechat res:', res)
      const {access_token} = JSON.parse(res)
      assert(access_token, 'get access_token failed')
      return access_token
    }).catch((err) => {
      debug('=== getAccessTokenFromWechat Error:', err)
      return ''
    })
  }
}

module.exports = WechatService
