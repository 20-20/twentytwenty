'use strict'

const {STRING} = require('sequelize')

module.exports = db => db.define('topics', {
  name: {
    type: STRING,
    validate: {
      notNull: true,
      notEmpty: true
    }
  }
})

module.exports.associations = (Topic, {Comment, Article, Relevance}) => {
  Topic.hasMany(Comment)
  Topic.belongsToMany(Article, {through: Relevance})
}
