
const {STRING, TEXT, INTEGER, DATE} = require('sequelize')

module.exports = db => db.define('comments', {
  text: {
    type: TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  upVote: {
    type: INTEGER,
  },
  downVote: {
    type: INTEGER
  },
  createdAt: {
    type: DATE,
    field: 'created_at'
  },
  domElType: {
    type: STRING,
    allowNull: true
  },
  domElText: {
    type: TEXT,
    allowNull: true
  }
})

module.exports.associations = (Comment, { Paragraph, User, Article, Topic }) => {
  Comment.belongsTo(User)
  Comment.belongsTo(Paragraph)
  Comment.belongsTo(Article)
  Comment.belongsTo(Comment, {as: 'parent'})
}
