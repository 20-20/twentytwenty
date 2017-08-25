'use strict'

const db = require('APP/db')
const Paragraph = db.model('paragraphs')
const router = require('express').Router()
const { mustBeLoggedIn, forbidden } = require('./auth.filters')

router.get('/:articleId', (req, res, next) => {
  Paragraph.findAll({
    where: {
      article_id: req.params.articleId
    },
  })
  .then(paragraphs => res.json(paragraphs))
  .catch('Error fetching article with provided Id')
})

module.exports = router
