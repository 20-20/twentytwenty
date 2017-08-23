const { FLOAT } = require('sequelize')

module.exports = db => db.define('relevances', {
  score: {
    type: FLOAT,
    defaultValue: 0
  }
})

module.exports.associations = (Relevance, { Article, Topic }) => {
  Article.hasMany(Relevance)
  Topic.hasMany(Relevance)
}

