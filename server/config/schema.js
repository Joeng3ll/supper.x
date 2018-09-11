module.exports = {
  env: {
    doc: 'The application environment',
    format: ['production', 'staging', 'development', 'test'],
    default: 'development',
    // npm scripts env
    env: 'NODE_ENV'
  },
  api: {
    port: {
      doc: 'The API port',
      format: 'port',
      default: 8888,
    },
    host: {
      doc: 'The API HOST',
      default: 'test.supper.com'
    },
    timeout: {
      doc: 'The API timeout',
      format: 'nat',
      default: 60 * 1000, // 1 minutes
    },
  },
  wechat: {
    host: {
      doc: 'The wechat API HOST',
      default: 'qyapi.weixin.qq.com',
    },
    corpid: {
      doc: 'The wechat business corpid',
      default: 'ww7476710148f3f0ad'
    },
    corpsecret: {
      doc: 'The application secret',
      default: 'U46pEY9sGrR_n05QvX1VuosMTrKiWl1RtWiM5DXTUbU'
    },
    token_cache_name:{
      doc: 'The access token cache name',
      default: 'access_token'
    },
    ticket_cache_name: {
      doc: 'The userticket cache name',
      default: 'user_ticket'
    },
    cache_max_age: {
      doc: 'The token cache expires',
      default: '7200'
    }
  }
}
