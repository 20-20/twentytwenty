
const {STRING, TEXT, INTEGER, DATE} = require('sequelize')

module.exports = db => db.define('comments', {
  text: {
    type: TEXT,
    allowNull: false
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
  }
})

module.exports.associations = (Comment, { User }) => {
  Comment.belongsTo(User)
}
