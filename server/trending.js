'use strict'

const db = require('APP/db')
const Article = db.model('articles')
const router = require('express').Router()
const { mustBeLoggedIn, forbidden } = require('./auth.filters')
const Paragraph = db.model('paragraphs')
const Comment = db.model('comments')

// All trending route
// OB/ET: /api/trending => /api/articles?status=trending&sortBy=createdAt&includeAll=true
// OB/ET: also consider sequelize scopes
module.exports = router.get('/', (req, res, next) => {
  Article.findAll({
    where: {status: 'trending'},
    limit: 5,
    order: [['created_at', 'DESC']],
    include: [{ model: Paragraph, include: [Comment] }]
  })
    .then(articles => res.json(articles))
    .catch(next)
})
