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
  status: {
    type: ENUM,
    values: ['trending', 'notTrending'],
    defaultValue: 'notTrending'
  }
},
  {
    getterMethods: {
      totalVotes: function() { return this.upVotes + this.downVotes },
      engagement: function() { return this.commentsCount + this.totalVotes }
    }
  }
)

module.exports.associations = (Article, { Paragraph, Comment, Topic, User, History }) => {
  Article.hasMany(Paragraph)
  Article.hasMany(Comment)
  Article.belongsTo(Topic)
  Article.belongsToMany(User, {through: History})
}

