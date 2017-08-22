'use strict'

const {STRING, ENUM, TEXT, DATE, INTEGER} = require('sequelize')

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
  status: {
    type: ENUM,
    values: ['trending', 'notTrending'],
    defaultValue: 'notTrending'
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

module.exports.associations = (Article, { Paragraph, Comment, Topic, User, History }) => {
  Article.hasMany(Paragraph)
  Article.hasMany(Comment)
  Article.belongsTo(Topic)
  Article.belongsToMany(User, {through: History})
}

