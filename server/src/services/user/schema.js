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
              type: 'date'
            },
            endTime: {
              type: 'date'
            },
            dishes: {
              type: 'array'
            }
          }
        }
      },
    },
    response: {
      '2xx': {
        type: 'object',
        properties: {

        }
      }
    }
  }
}

module.exports = {
  addMenu
}
