'use strict'

const { STRING, ENUM, TEXT, DATE, INTEGER, FLOAT, BOOLEAN } = require('sequelize')

module.exports = db => db.define('articles', {
  url: {
    type: STRING,
    alowNull: false,
    validate: {
      isUrl: true,
      notEmpty: true
    }
  },
  author: {
    type: STRING
  },
  date: {
    type: DATE,
    allowNull: false
  },
  publication: {
    type: STRING
  },
  rating: {
    type: INTEGER
  },
  title: {
    type: STRING,
  },
  body: {
    type: TEXT
  },
  urlToImage: {
    type: STRING
  },
  publishedAt: {
    type: STRING
  },
  description: {
    type: STRING
  },
  views: {
    type: STRING
  },
  trending: {
    type: BOOLEAN,
    defaultValue: false
  },
  sentimentScore: {
    type: FLOAT,
    defaultValue: 0
  },
  sadness: {
    type: FLOAT,
    defaultValue: 0
  },
  joy: {
    type: FLOAT,
    defaultValue: 0
  },
  fear: {
    type: FLOAT,
    defaultValue: 0
  },
  disgust: {
    type: FLOAT,
    defaultValue: 0
  },
  anger: {
    type: FLOAT,
    defaultValue: 0
  },
})

module.exports.associations = (Article, { Paragraph, Comment, Topic, User, History, Relevance }) => {
  Article.hasMany(Paragraph)
  Article.hasMany(Comment)
  Article.belongsToMany(Topic, { through: Relevance })
  Article.belongsToMany(User, { through: History })
}
