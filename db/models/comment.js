
const {STRING, TEXT, INTEGER, DATE} = require('sequelize')

module.exports = db => db.define('comments', {
  text: {
    type: TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  upVote: { // OB/ET: consider join table `article_votes`, joining users and articles, and adding another vote field that would be "up" or "down"
    type: INTEGER,
  },
  downVote: {
    type: INTEGER
  },
  createdAt: {
    type: DATE,
    field: 'created_at'
  },
})

module.exports.associations = (Comment, { Paragraph, User, Article, Topic }) => {
  Comment.belongsTo(User)
  Comment.belongsTo(Paragraph)
  Comment.belongsTo(Topic)
  Comment.belongsTo(Article)
  Comment.belongsTo(Comment, {as: 'parent'})
}
