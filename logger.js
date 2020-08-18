const log4js = require('log4js');

log4js.configure({
    appenders: {
      file: {
        type: 'file',
        filename: 'logger/app.log',
        layout: {
          type: 'pattern',
          // pattern: '%d %r %p - %m',
          pattern: '[%d{yyyy/MM/dd hh:mm:ss}] %p - %m',
        }
      },
      error: {
        type: 'file',
        filename: 'logger/error.log',
        layout: {
          type: 'pattern',
          pattern: '%r %p - %m',
        }
      }
    },
    categories: {
      default: {
        appenders: ['file', 'error'],
        level: 'debug'
      }
    }
  })

  module.exports = log4js.getLogger();