const debug = require('debug')('supper-server:entry')

// import app from './factory'
const app = require('./factory')


const PORT = 8888
app.listen(PORT, err => {
  if (err) {
    debug('app booting error')
    throw err
  }
  debug(`server starting on http://${server}:${PORT}`)
})
