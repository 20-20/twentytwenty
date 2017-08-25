'use strict'

const db = require('APP/db')
const Article = db.model('articles')
const router = require('express').Router()
const { mustBeLoggedIn, forbidden } = require('./auth.filters')

module.exports = router.get('/:articleId', (req, res, next) => {
  Article.findOne({
    where: {
      id: req.params.articleId
    }
  })
  .then(article =>
    Article.findAll({
      where: {
        topics: { $contains: [article.topics[0]] }
      }
    })
  )
  .then(data => {
    res.json(data)
  })
  .catch(next)
})
