const debug = require('debug')('supper-server:wechatService')

const assert = require('assert')

const http = require('../../utils/http')
class WechatService {
  constructor(config, cache) {
    this.config = config
    this.cache = cache
    this.urlPrefix = `https://${config.host}`
  }

  /**
   *  1、获取access_token
   *  @param {string} corpid
   *  @param {string} corpsecret
   *  @return {string} access_token
   *  需要缓存和重新获取 access_token
   */
  getAccessToken = async () => {
    const {
      token_cache_name: CACHE_KEY,
      corpid,
      corpsecret
    } = this.config
    const url = `${this.urlPrefix}/cgi-bin/gettoken?corpid=${corpid}&corpsecret=${corpsecret}`

    // 1、get token from cache
    const token_in_cache = this.getFromCache(this.config.token_cache_name)
    if (token_in_cache) {
      return token_in_cache
    }

    // 2、get token from api
    // TODO 企业微信可能会出于运营需要，提前使access_token失效，应实现access_token失效时重新获取的逻辑。
    return http(url).then((res) => {
      debug('=== getAccessTokenFromWechat res:', res)
      const {
        access_token,
        expires_in
      } = JSON.parse(res)
      assert(access_token, 'get access_token failed')
      // set toekn into cache
      this.cache.set(CACHE_KEY, access_token, expires_in)
      return access_token
    }).catch((err) => {
      debug('=== getAccessTokenFromWechat Error:', err)
      return ''
    })
  }

  getFromCache = (cacheKey) => {
    let cacheVal = ''
    try {
      cacheVal = this.cache.get(cacheKey)
      debug('getFromCache:', cacheKey, cacheVal)
    } catch (e) {
      debug('getFromCache Error:', e)
    }
    return cacheVal
  }

  /**
   *  2、获取用户信息
   *  @param {string} code
   *  @param {string} access_token
   *  @return {user_ticket}
   */
  getUserTicket = async (code) => {
    const ticket_in_cache = this.getFromCache(this.config.ticket_cache_name)
    if (ticket_in_cache) {
      return ticket_in_cache
    }
    const access_token = await this.getAccessToken()
    const url = `${this.urlPrefix}/cgi-bin/user/getuserinfo?access_token=${access_token}&code=${code}`
    return http(url).then((res) => {
      debug('=== getUserTicket res:', res)
      const {
        user_ticket,
        expires_in
      } = JSON.parse(res)
      assert(user_ticket, 'getUserTicket failed')
      // set toekn into cache
      this.cache.set(this.config.ticket_cache_name, user_ticket, expires_in)
      return user_ticket
    }).catch((err) => {
      debug('=== getUserTicket Error:', err)
      return ''
    })
  }


}

module.exports = WechatService
