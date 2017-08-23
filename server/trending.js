'use strict'

const db = require('APP/db')
const Article = db.model('articles')
const router = require('express').Router()
const { mustBeLoggedIn, forbidden } = require('./auth.filters')
const Paragraph = db.model('paragraphs')
const Comment = db.model('comments')
const Topic = db.model('topics')

// All trending route
module.exports = router.get('/', (req, res, next) => {
  Article.findAll({
    where: {trending: true},
    limit: 5,
    order: [['created_at', 'DESC']],
    include: [{ model: Paragraph, include: [Comment] }, { model: Topic }]
  })
    .then(articles => res.json(articles))
    .catch(next)
})
