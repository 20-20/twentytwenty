'use strict'

const { STRING, TEXT, DATE, INTEGER, FLOAT, BOOLEAN, ARRAY } = require('sequelize')

module.exports = db => db.define('articles', {
  url: {
    type: STRING,
    alowNull: false,
    validate: {
      isUrl: true,
      notEmpty: true
    }
  },
  date: {
    type: DATE,
    allowNull: false
  },
  publication: {
    type: STRING
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
  commentsCount: {
    type: INTEGER,
    defaultValue: 0
  },
  topics: {
    type: ARRAY(STRING)
  }
})

module.exports.associations = (Article, { Paragraph, Comment, User }) => {
  Article.hasMany(Paragraph)
  Article.hasMany(Comment)
}
