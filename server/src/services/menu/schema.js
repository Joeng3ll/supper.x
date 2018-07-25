const addMenu = {
  schema: {
    body: {
      type: 'object',
      properties: {
        user_ticket: {
          type: 'string'
        },
        menu: {
          type: 'object',
          properties: {
            startTime: {
              type: 'string'
            },
            endTime: {
              type: 'string'
            },
            dishes: {
              type: 'string'
            }
          }
        }
      },
    },
    response: {
      '2xx': {
        type: 'object',
      }
    }
  }
}

module.exports = {
  addMenu
}
