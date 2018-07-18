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
      default: 8088,
    },
    host: {
      doc: 'The API HOST',
      default: '0.0.0.0'
    },
    timeout: {
      doc: 'The API timeout',
      format: 'nat',
      default: 60 * 1000, // 1 minutes
    },
  }
}
