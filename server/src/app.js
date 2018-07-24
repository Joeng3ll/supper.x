const debug = require('debug')('supper-server:entry')
const chalk = require('chalk')
const fp = require('fastify-plugin')

import app, {
  config
} from './factory'

debug('===api config:===', config.get('api'))
const {
  port: PORT,
  host: HOST
} = config.get('api')

/**
 *  global config
 */

app.register(fp(async (fastify) => {
  fastify.decorate('config', config)
}))

/**
 *   logic service
 */
app.register(require('./services'))


app.listen(PORT, err => {
  if (err) {
    chalk.red('app booting error')
    throw err
  }
  debug(`server starting on http://${HOST}:${PORT}`)
})
