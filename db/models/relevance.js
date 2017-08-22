const { FLOAT } = require('sequelize')

module.exports = db => db.define('relevances', {
  score: {
    type: FLOAT,
    defaultValue: 0
  }
})
