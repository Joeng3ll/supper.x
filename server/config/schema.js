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
      default: ''
    },
    corpsecret: {
      doc: 'The application secret',
      default: ''
    }
  }
}
