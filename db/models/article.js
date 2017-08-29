'use strict'

const { STRING, ENUM, TEXT, DATE, INTEGER, FLOAT, BOOLEAN, ARRAY } = require('sequelize')

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
  commentsCount: {
    type: INTEGER,
    defaultValue: 0
  },
  upVotes: {
    type: INTEGER,
    defaultValue: 0
  },
  downVotes: {
    type: INTEGER,
    defaultValue: 0
  },
  totalVotes: {
    type: INTEGER,
    defaultValue: 0
  },
  engagement: {
    type: INTEGER,
    defaultValue: 0
  },
  topics: {
    type: ARRAY(STRING)
  }
},
  {
    hooks: {
      beforeCreate: article => {
        article.totalVotes = article.upVotes + article.downVotes
        article.engagement = article.totalVotes + article.commentsCount
      }
    }
  }
)

module.exports.associations = (Article, { Paragraph, Comment, User, History }) => {
  Article.hasMany(Paragraph)
  Article.hasMany(Comment)
  Article.belongsToMany(User, { through: History })
}
