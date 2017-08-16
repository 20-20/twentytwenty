'use strict'

const db = require('APP/db')
const Article = db.Article
const Comment = db.Comment
const router = require('express').Router()

module.exports = router

// add comment
router.post('/', (req, res, next) => {
  Comment.create(req.body)
  .then(comment => res.json(comment))
  .catch(next)
})

// update comment
router.put('/:id', (req, res, next) => {
  Comment.findById(req.params.id)
  .then(article => article.update(req.body))
  .then(updatedComment => res.json(updatedComment))
  .catch(next)
})
