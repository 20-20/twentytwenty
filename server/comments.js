'use strict'

const db = require('APP/db')
const Article = db.Article
const router = require('express').Router()

module.exports = router

// Single article Route
router.get('/:id', (req, res, next) => {
  Article.findById(req.params.id)
    .then(article => res.json(article))
    .catch(next)
})

// Update article
router.put('/:articleId', (req, res, next) => {
  Article.findById(req.params.id)
  .then(article => article.update(req.body))
  .then(updatedarticle => res.json(updatedarticle))
  .catch(next)
})
