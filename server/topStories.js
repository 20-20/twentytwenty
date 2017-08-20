'use strict'

const db = require('APP/db')
const Article = db.model('articles')
const router = require('express').Router()

module.exports = router
  .get('/',
  (req, res, next) =>
    Article.findAll({
      limit: 5,
      order: [
        ['commentsCount', 'DESC']
      ]
    }).then(story => res.json(story))
    .catch(next)
  )



