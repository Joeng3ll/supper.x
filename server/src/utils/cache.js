const debug = require('debug')('supper-server:cache')
const LRU = require('lru-cache')

//  todo cache oversized
class Cache {
  constructor(cacheOptions = {}) {
    this.cache = LRU(cacheOptions)
  }

  get(key) {
    const {
      expire,
      storeTime,
      value
    } = this.cache.get(key) || {}
    // 有过期时间 ——> 判断是否过期 -> 过期 -> 清缓存
    const validity = expire ? this._checkCacheAging(expire, storeTime) : true
    if (!validity) {
      debug('Cache Clear Key',key, this.cache.get(key))
      this.set(key, '')
    }
    return validity ? value : ''
  }

  /**
   *
   * @param {number} expire 缓存时效
   * @param {date} storeTime 缓存日期
   * @return { boolean } isInAging 是否过期
   */
  _checkCacheAging(expire, storeTime) {
    // TODO type judge
    const currentTime = new Date()
    const diffTime = (currentTime - storeTime) / 1000
    debug('_checkCacheAging:',storeTime,currentTime,diffTime,diffTime > expire, typeof expire)
    return diffTime < expire
  }

  /**
   *
   * @param {string} key
   * @param {any} value
   * @param {date} expire 过期时间 秒
   */
  set(key, value, expire) {
    const cacheObj = {
      expire,
      storeTime: new Date(),
      value
    }
    this.cache.set(key, cacheObj)
  }


  /**
   *  empty the cache
   */
  empty() {
    this.cache.reset()
  }
}

module.exports = Cache
