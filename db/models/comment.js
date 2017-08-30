
const {STRING, TEXT, DATE} = require('sequelize')

module.exports = db => db.define('comments', {
  text: {
    type: TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
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

module.exports.associations = (Comment, { Paragraph, User, Article }) => {
  Comment.belongsTo(User)
  Comment.belongsTo(Paragraph)
  Comment.belongsTo(Article)
}
