
const {STRING, TEXT, INTEGER, DATE} = require('sequelize')

module.exports = db => db.define('comments', {
  text: {
    type: TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  rating: {
    type: INTEGER,
    validate: {
      min: 1,
      max: 5
    }
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
