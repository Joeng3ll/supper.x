// 通过node引入的待.es6,.es,.jsx,.js后缀的所有后续文件会被babel转译 
// 愉快的使用 ES6/7
require('babel-register') 

module.exports = require('./src/app.js') 