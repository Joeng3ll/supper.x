import Fastify from 'fastify'
import config from 'rob-config'


// todo add global config
const fastify = Fastify()
fastify.register(require('./db').default)

export {config}
export default fastify
