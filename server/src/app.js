const debug = require('debug')('supper-server:entry')
const chalk = require('chalk')

import app, {
  config
} from './factory'

debug('===api config:===', config.get('api'))
const {
  port: PORT,
  host: HOST
} = config.get('api')

app.register(require('./services').default)


app.listen(PORT, err => {
  if (err) {
    chalk.red('app booting error')
    throw err
  }
  debug(`server starting on http://${HOST}:${PORT}`)
})
