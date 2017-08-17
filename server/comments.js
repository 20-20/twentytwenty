'use strict'

const db = require('APP/db')
const Comment = db.Comment
const router = require('express').Router()

module.exports = router

// Get all comments
router.get('/', (req, res, next) => {
  Comment.findById(req.params.id)
    .then(comment => res.json(comment))
    .catch(next)
})

// Single comment Route
router.get('/:id', (req, res, next) => {
  Comment.findById(req.params.id)
    .then(comment => res.json(comment))
    .catch(next)
})

// Update comment
router.put('/:commentId', (req, res, next) => {
  Comment.findById(req.params.id)
  .then(comment => comment.update(req.body))
  .then(updatedcomment => res.json(updatedcomment))
  .catch(next)
})
