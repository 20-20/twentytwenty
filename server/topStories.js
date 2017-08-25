'use strict'

const db = require('APP/db')
const Article = db.model('articles')
const Paragraph = db.model('paragraphs')
const Comment = db.model('comments')
const router = require('express').Router()


module.exports = router
  .get('/', (req, res, next) => {
    Article.findAll({
      limit: 5,
      order: [
        [`${req.query.sortBy}`, 'DESC']
      ],
      include: [{ model: Paragraph, include: [Comment] }, { model: Topic }]
    }).then(story => res.json(story))
      .catch(next)
  })
