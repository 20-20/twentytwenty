
const { TEXT, INTEGER, STRING } = require('sequelize')

module.exports = db => db.define('paragraphs', {
  text: {
    type: TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  index: {
    type: INTEGER,
    allowNull: false
  },
  url: {
    type: STRING,
    allowNull: false
  }
})

module.exports.associations = (Paragraph, { Article, Comment }) => {
  Paragraph.belongsTo(Article)
  Paragraph.hasMany(Comment)
  Article.hasMany(Paragraph)
}
